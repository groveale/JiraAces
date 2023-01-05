declare interface IHelloJiraAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  GroupName: string;
  TitleFieldLabel: string;
  IconPropertyFieldLabel: string;
  QuickViewButtonText: striing;
  CardViewTextSingular: string;
  CardViewTextPlural: string;
  CardViewNoTasks: string;
  CardViewDescription: string;
  QuickViewDescription: string;
  OpenedLabel: string;
  OverdueLabel: string;
}

declare module 'HelloJiraAdaptiveCardExtensionStrings' {
  const strings: IHelloJiraAdaptiveCardExtensionStrings;
  export = strings;
}
