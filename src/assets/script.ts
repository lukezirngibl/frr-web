import { COUNTRIES_DE } from './countries-de'
import { COUNTRIES_EN } from './countries-en'
import { COUNTRIES_FR } from './countries-fr'
import { COUNTRIES_IT } from './countries-it'

const runScript = () => {
  COUNTRIES_EN.forEach(c => {
    const it = COUNTRIES_IT.find(i => i.alpha3 === c.alpha3)
    const de = COUNTRIES_DE.find(i => i.alpha3 === c.alpha3)
    const fr = COUNTRIES_FR.find(i => i.alpha3 === c.alpha3)

    console.log(`${c.alpha3};${c.name};${de.name};${fr.name};${it.name}`)
  })
}

runScript()
