import React, {Component} from 'react';
import logo from './gna-logo.svg';
import './App.css';
import GraphiQL from 'graphiql';
import '../node_modules/graphiql/graphiql.css';


const search = window.location.search;
const parameters = {};
search.substr(1).split('&').forEach(function (entry) {
    const eq = entry.indexOf('=');
    if (eq >= 0) {
        parameters[decodeURIComponent(entry.slice(0, eq))] =
            decodeURIComponent(entry.slice(eq + 1));
    }
});

// if variables was provided, try to format it.
if (parameters.variables) {
    try {
        parameters.variables =
            JSON.stringify(JSON.parse(parameters.variables), null, 2);
    } catch (e) {
        // Do nothing, we want to display the invalid JSON as a string, rather
        // than present an error.
    }
}

// When the query and variables string is edited, update the URL bar so
// that it can be easily shared
function onEditQuery(newQuery) {
    parameters.query = newQuery;
    updateURL();
}

function onEditVariables(newVariables) {
    parameters.variables = newVariables;
    updateURL();
}

function onEditOperationName(newOperationName) {
    parameters.operationName = newOperationName;
    updateURL();
}

function updateURL() {
    const newSearch = '?' + Object.keys(parameters).filter(function (key) {
        return Boolean(parameters[key]);
    }).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(parameters[key]);
    }).join('&');
    window.history.replaceState(null, null, newSearch);
}

// Defines a GraphQL fetcher using the fetch API. You're not required to
// use fetch, and could instead implement graphQLFetcher however you like,
// as long as it returns a Promise or Observable.
function graphQLFetcher(graphQLParams) {
    // This example expects a GraphQL server at the path /graphql.
    // Change this to point wherever you host your GraphQL server.
    return fetch('/api/graphql', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphQLParams),
        credentials: 'include',
    }).then(function (response) {
        return response.text();
    }).then(function (responseBody) {
        try {
            return JSON.parse(responseBody);
        } catch (error) {
            return responseBody;
        }
    });
}

const defaultQuery = `# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# Keyboard shortcuts:
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#

{
  nameResolver(names: [{value: "Homo sapiens", suppliedId: "foo"}],
    					 dataSourceIds: [1, 2, 3],
    					 preferredDataSourceIds: [3, 4],
    					 bestMatchOnly: false) {
    responses {
      total
      suppliedId
      suppliedInput
      results {
        name {
          id
          value
        }
        canonicalName {
          id 
          value
          valueRanked
        }
        resultsPerDataSource {
          dataSource {
            id
            title
          }
          results {
            name {
              id
              value
            }
            synonym
            taxonId
            matchType {
              kind
              score
              verbatimEditDistance
              stemEditDistance
            }
            score {
              nameType
              authorScore {
                authorshipInput
                authorshipMatch
                value
              }
              parsingQuality
              value
            }
          }
        }
      }
      preferredResults {
        name {
          id
          value
        }
        localId
        url
      }
    }
    context {
      clade
      dataSource {
        id
        title
      }
    }
  }
}`;

class CustomGraphQL extends Component {
    constructor(props) {
        super(props);

        this.handleClickPrettifyButton = this.handleClickPrettifyButton.bind(this);

        this.state = {
            // REQUIRED:
            // `fetcher` must be provided in order for GraphiQL to operate
            fetcher: graphQLFetcher,

            // OPTIONAL PARAMETERS
            // GraphQL artifacts
            query: parameters.query,
            variables: parameters.variables,
            response: '',

            // GraphQL Schema
            // If `undefined` is provided, an introspection query is executed
            // using the fetcher.
            schema: undefined,

            // Useful to determine which operation to run
            // when there are multiple of them.
            operationName: parameters.operationName,
            storage: null,
            defaultQuery: defaultQuery,

            // Custom Event Handlers
            onEditQuery: onEditQuery,
            onEditVariables: onEditVariables,
            onEditOperationName: onEditOperationName,

            // GraphiQL automatically fills in leaf nodes when the query
            // does not provide them. Change this if your GraphQL Definitions
            // should behave differently than what's defined here:
            // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
            getDefaultFieldNames: null
        };
    }

    // Example of using the GraphiQL Component API via a toolbar button.
    handleClickPrettifyButton() {
        const editor = this.graphiql.getQueryEditor();
        const currentText = editor.getValue();
        const {parse, print} = require('graphql');
        const prettyText = print(parse(currentText));
        console.log(prettyText);
        editor.setValue(prettyText);
    }

    handleSave() {
        console.log('saved');
    }

    render() {
       return (
           <GraphiQL ref={c => { this.graphiql = c; }} {...this.state}>
                <GraphiQL.Logo>
                    <a href="/"><img src={logo} width="30em" /></a>
                </GraphiQL.Logo>
                <GraphiQL.Toolbar>

                    <GraphiQL.Button
                        onClick={this.handleClickPrettifyButton}
                        label="Prettify"
                        title="Prettify Query (Shift-Ctrl-P)"
                    />

                </GraphiQL.Toolbar>
                <GraphiQL.Footer>
                    {/*Footer works the same as Toolbar*/}
                    {/*add items by appending child components*/}
                </GraphiQL.Footer>
            </GraphiQL>
        );
    }
}

class App extends Component {
    render() {
        return (
             <CustomGraphQL id="graphiql"/>
        );
    }
}

export default App;
