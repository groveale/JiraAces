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
    return {
      issue: this.state.assignedJiraIssues[0],
      strings: strings,
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/DetailedViewTemplate.json');
  }
}