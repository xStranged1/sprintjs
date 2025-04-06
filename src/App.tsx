import './App.css'
import { Route, Switch } from "wouter";
import { HomeScreen } from './screens/HomeScreen'
import { StatsScreen } from './screens/statsScreen/StatsScreen';
import { Navbar } from './core/Navbar/Navbar';
import { Toaster } from './components/ui/toaster';
import { PaceScreen } from './screens/PaceScreen';
import { Footer } from './core/Footer';
import { LoginScreen } from './screens/LoginScreen';
import { DetailSprintScreen } from './screens/DetailSprintScreen';

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
        <Route path="/sprintjs/login" component={LoginScreen} />
        <Route path="/sprintjs" component={HomeScreen} />
        <Route path="/sprintjs/stats" component={StatsScreen} />
        <Route path="/sprintjs/calculate-pace" component={PaceScreen} />
        <Route path="/sprintjs/:sprintId" component={DetailSprintScreen}>
          {(params) => <>Hello, {params.sprintId}!</>}
        </Route>

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
