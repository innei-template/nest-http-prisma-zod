import { Post } from '@prisma/client'

export const enum BusinessEvents {
  GATEWAY_CONNECT = 'GATEWAY_CONNECT',
  GATEWAY_DISCONNECT = 'GATEWAY_DISCONNECT',

  VISITOR_ONLINE = 'VISITOR_ONLINE',
  VISITOR_OFFLINE = 'VISITOR_OFFLINE',

  AUTH_FAILED = 'AUTH_FAILED',

  POST_CREATE = 'POST_CREATE',
}

/// ============= types =========
//
//

interface IGatewayConnectData {}

interface IGatewayDisconnectData {}

interface IVisitorOnlineData {}

interface IVisitorOfflineData {}

interface IAuthFailedData {}

interface IPostCreateData extends Post {}

export type BizEventDataMap = {
  [BusinessEvents.GATEWAY_CONNECT]: IGatewayConnectData
  [BusinessEvents.GATEWAY_DISCONNECT]: IGatewayDisconnectData
  [BusinessEvents.VISITOR_ONLINE]: IVisitorOnlineData
  [BusinessEvents.VISITOR_OFFLINE]: IVisitorOfflineData
  [BusinessEvents.AUTH_FAILED]: IAuthFailedData
  [BusinessEvents.POST_CREATE]: IPostCreateData
}
