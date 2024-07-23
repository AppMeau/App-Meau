import * as React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';
function App() {
    
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Courgette_400Regular,
    });
    if(!fontsLoaded){
        return null
    }
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