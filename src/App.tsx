import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Guide from './components/Guide'
import BriefBuilder from './components/BriefBuilder'
import Examples from './components/Examples'
import Tips from './components/Tips'
import Resources from './components/Resources'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Guide />
        <BriefBuilder />
        <Examples />
        <Tips />
        <Resources />
      </main>
      <Footer />
    </>
  )
}
