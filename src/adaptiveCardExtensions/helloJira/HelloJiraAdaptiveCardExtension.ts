import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HelloJiraPropertyPane } from './HelloJiraPropertyPane';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IHelloJiraAdaptiveCardExtensionProps {
  title: string;
}

export interface IHelloJiraAdaptiveCardExtensionState {
  issueCount: number;
}

const CARD_VIEW_REGISTRY_ID: string = 'HelloJira_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HelloJira_QUICK_VIEW';

export default class HelloJiraAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHelloJiraAdaptiveCardExtensionProps,
  IHelloJiraAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HelloJiraPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      issueCount: 0
    };

    // call search to get issues

    // call function to get issues / project break down

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    this._getIssuesFromJira();

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'HelloJira-property-pane'*/
      './HelloJiraPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.HelloJiraPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  private _getIssuesFromJira(): Promise<void> {
      return this.context.httpClient
      .get(`https://groverale.atlassian.net/rest/api/3/search`,
      HttpClient.configurations.v1,
      {
        headers: [
          // base 64 of username and api token - not great for prod 
          // Need a way of authenticating with JIRA
          ['Authorization', 'Basic YWxleGdyb3ZlckBtaWNyb3NvZnQuY29tOnRneXVaOG9WalhlM2NQaWtVcXQyRjk0Mw==']
        ]
      })
      .then((res: HttpClientResponse): Promise<any> => {
        return res.json();
      })
      .then((response: any): void => {
        console.log(response);
        this.setState({
          issueCount: response.issues.length
        })
      })
  }
}
