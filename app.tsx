import * as React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <Routes/>
            </PersistGate>
        </Provider>  
    );
}

export default App;