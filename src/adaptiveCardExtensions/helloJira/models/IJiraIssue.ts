
export interface IJiraIssue {
    id: string;
    key: string;
    created: string;
    title: string;
    description: string;
    statusText: string;
    statusCategoryKey: string;
    project: IJiraProject
    resolved: boolean
    reporter: IJiraUser
    assignee: IJiraUser
    duedate: string
    overDueDays: string
}

export interface IJiraProject {
    id: string
    key: string
    name: string
    avatarUri: string
}

export interface IJiraUser {
    email: string
    timeZone: string
    name: string
    avatarUri: string
}
