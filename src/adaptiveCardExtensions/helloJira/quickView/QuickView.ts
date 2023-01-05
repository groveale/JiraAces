import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HelloJiraAdaptiveCardExtensionStrings';
import { DETAILED_VIEW_REGISTRY_ID, IHelloJiraAdaptiveCardExtensionProps, IHelloJiraAdaptiveCardExtensionState } from '../HelloJiraAdaptiveCardExtension';
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
    return require('./template/JirraIssueSummaryTemplate.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {
    if ((<ISubmitActionArguments>action).type === 'Submit') {
      const submitAction = <ISubmitActionArguments>action;
      const { id, issueKey } = submitAction.data;
      if (id === 'selectIssue') {
        this.setState({ currentIssueKey: issueKey });
        this.quickViewNavigator.push(DETAILED_VIEW_REGISTRY_ID);
      }
    }
  }
}