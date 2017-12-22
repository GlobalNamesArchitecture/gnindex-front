export class NameStringEntry {
  name = '';
  canonicalName = '';
  classificationPath = '';

  constructor(name: string,
              canonicalName: string,
              classificationPath: string) {
    this.name = name;
    this.canonicalName = canonicalName;
    if (classificationPath != null) {
      this.classificationPath = classificationPath.replace(/\|/gi, ' > ');
    }
  }
}
