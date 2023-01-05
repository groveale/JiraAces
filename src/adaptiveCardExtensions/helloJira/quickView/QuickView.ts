import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HelloJiraAdaptiveCardExtensionStrings';
import { IHelloJiraAdaptiveCardExtensionProps, IHelloJiraAdaptiveCardExtensionState } from '../HelloJiraAdaptiveCardExtension';
import { IJiraIssue } from '../models/IJiraIssue';

export interface IQuickViewData {
  numberOfTasks: string;
  issues: IJiraIssue[];
  strings: IHelloJiraAdaptiveCardExtensionStrings;
}

export class QuickView extends BaseAdaptiveCardView<
  IHelloJiraAdaptiveCardExtensionProps,
  IHelloJiraAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    let numberOfTasks: string = strings.CardViewNoTasks;
    if (this.state.assignedJiraIssues.length > 1) {
      numberOfTasks = `${this.state.assignedJiraIssues.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      numberOfTasks = `${this.state.assignedJiraIssues.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      numberOfTasks: numberOfTasks,
      issues: this.state.assignedJiraIssues,
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ServiceDeskTemplate.json');
  }
}