import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import { find } from '@microsoft/sp-lodash-subset';
import * as strings from 'HelloJiraAdaptiveCardExtensionStrings';
import { IHelloJiraAdaptiveCardExtensionProps, IHelloJiraAdaptiveCardExtensionState } from '../HelloJiraAdaptiveCardExtension';
import { IJiraIssue } from '../models/IJiraIssue';

export interface IDetailedQuickViewData {
  issue: IJiraIssue;
  strings: IHelloJiraAdaptiveCardExtensionStrings;
}

export class DetailedQuickView extends BaseAdaptiveCardView<
    IHelloJiraAdaptiveCardExtensionProps,
    IHelloJiraAdaptiveCardExtensionState,
    IDetailedQuickViewData
> {
  public get data(): IDetailedQuickViewData {
    const jiraIssue = this.state.assignedJiraIssues.filter((issue) => {
        return issue.key === this.state.currentIssueKey;
      });
    return {
      issue: jiraIssue[0],
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedViewTemplate.json');
  }
}