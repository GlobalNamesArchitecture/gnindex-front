export class NameStringEntry {
  name = '';
  canonicalName = '';
  classificationPath = '';
  dataSourceTitle = '';

  constructor(name: string,
              canonicalName: string,
              classificationPath: string,
              dataSourceTitle: string) {
    this.name = name;
    this.canonicalName = canonicalName;
    this.dataSourceTitle = dataSourceTitle;
    if (classificationPath != null) {
      this.classificationPath = classificationPath.replace(/\|/gi, ' > ');
    }
  }
}
