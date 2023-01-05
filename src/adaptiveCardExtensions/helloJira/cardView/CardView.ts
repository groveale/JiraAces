import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'HelloJiraAdaptiveCardExtensionStrings';
import { IHelloJiraAdaptiveCardExtensionProps, IHelloJiraAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../HelloJiraAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IHelloJiraAdaptiveCardExtensionProps, IHelloJiraAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButtonText,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IPrimaryTextCardParameters {
    let primaryText: string = strings.CardViewNoTasks;
    if (this.state.assignedJiraIssues.length > 1) {
      primaryText = `${this.state.assignedJiraIssues.length.toString()} ${strings.CardViewTextPlural}`;
    } else {
      primaryText = `${this.state.assignedJiraIssues.length.toString()} ${strings.CardViewTextSingular}`;
    }
    return {
      primaryText: primaryText,
      description: strings.CardViewDescription,
      title: this.properties.title
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
