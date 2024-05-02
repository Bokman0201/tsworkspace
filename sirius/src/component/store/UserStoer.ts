import { create } from 'zustand'

interface clientInfoType {
  clientId: string
  clientNick: string
}

interface clientInfoState {
  clientInfo: clientInfoType
}

interface clientInfoActions {
  setClientInfo: (clientinfo: clientInfoType) => void
  deleteClientInfo: () => void
}

const defaultState = { clientId: '', clientNick: '' }

const useClientInfo  = create<clientInfoState & clientInfoActions>((set) => ({
  clientInfo: defaultState,
  setClientInfo: (clientInfo: clientInfoType) => {set({ clientInfo })},
  deleteClientInfo: () => {set({clientInfo: defaultState})}
}))

export default useClientInfo