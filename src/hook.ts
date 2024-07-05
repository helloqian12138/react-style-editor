import React from 'react';

export interface ReactStyleEditorStates {
  styles: React.CSSProperties;
}
export interface ReactStyleEditorContext extends ReactStyleEditorStates {
  setState: (
    states:
      | Partial<ReactStyleEditorStates>
      | ((states: ReactStyleEditorStates) => ReactStyleEditorStates),
    callback?: (states?: ReactStyleEditorStates) => void,
  ) => void;
}

export const EditorContext = React.createContext<ReactStyleEditorContext>({
  styles: {},
  setState: () => false,
});
