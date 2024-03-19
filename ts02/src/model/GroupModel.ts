export type groups = {
    groupsCreateDate: string,
    groupsHost: string,
    groupsId: number,
    groupsInviteCode: null,
    groupsName: string,
    groupsPw: null,
    groupStatus:string | null,
}

export type groupInfoType = {
    groupsId:number,
    groupsName :string,
    groupsHost : string,
    groupsCreateDate :string,
    groupInfoDescription :string|null,
    groupInfoMaxMember: number,
    groupStatus:string | null,
    memberCount:number
}