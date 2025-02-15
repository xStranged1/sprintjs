import './App.css'
import { Route, Switch } from "wouter";
import { HomeScreen } from './screens/HomeScreen'
import { StatsScreen } from './screens/StatsScreen';
import { Navbar } from './core/Navbar';
import { Toaster } from './components/ui/toaster';

function App() {

  return (
    <div className='justify-center items-center px-12'>
      <div className='mt-2' />
      <Navbar />
      <Toaster />
      <Route path="/about">About Us</Route>
      {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
      <Switch>
        <Route path="/sprintjs" component={HomeScreen} />
        <Route path="/stats" component={StatsScreen} />
        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
    </div>
  )
}

export default App
