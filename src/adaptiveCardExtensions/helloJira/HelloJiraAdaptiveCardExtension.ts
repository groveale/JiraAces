import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { HelloJiraPropertyPane } from './HelloJiraPropertyPane';
import { HttpClient, HttpClientResponse, AadHttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import { IJiraIssue } from './models/IJiraIssue';

export interface IHelloJiraAdaptiveCardExtensionProps {
  title: string;
  // aadAPIURL: string;
  // aadClientId: string;
}

export interface IHelloJiraAdaptiveCardExtensionState {
  issueCount: number;
  assignedJiraIssues: IJiraIssue[]
  reportedJiraIssues: IJiraIssue[]
}

const CARD_VIEW_REGISTRY_ID: string = 'HelloJira_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'HelloJira_QUICK_VIEW';

export default class HelloJiraAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IHelloJiraAdaptiveCardExtensionProps,
  IHelloJiraAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: HelloJiraPropertyPane | undefined;
  private jiraClient: AadHttpClient;

  public onInit(): Promise<void> {
    this.state = { 
      issueCount: 0,
      assignedJiraIssues: [],
      reportedJiraIssues: []
    };

    // call search to get issues

    // call function to get issues / project break down

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return this._getIssuesFromJira();
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

    // const requestHeaders: Headers = new Headers();
    // requestHeaders.append('Content-type', 'application/json');

    // const body: string = JSON.stringify({
    //   'jiraEmail': this.context.pageContext.user.loginName
    // });

    // const httpClientOptions: IHttpClientOptions = {
    //   body: body,
    //   headers: requestHeaders
    // };

    return this.context.httpClient
    .get('https://spfx-ag-jira.azurewebsites.net/api/GetIssuesForUser?jiraEmail=alexgrover@microsoft.com', HttpClient.configurations.v1,)
    //.getClient('00000000-0000-0000-0000-000000000000')
    // .then(client => client.get('https://spfx-ag-jira.azurewebsites.net/api/GetIssuesForUser?jiraEmail=alex.grover@outlook.com',
    //   AadHttpClient.configurations.v1))
    .then(response => response.json())
    .then(issues => {
      this.setState({
        issueCount: issues.openIssueCount,
        assignedJiraIssues: issues.assigned,
        reportedJiraIssues: issues.reported
      });
    });
  }
}
