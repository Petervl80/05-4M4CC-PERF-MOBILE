import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210'
  pokemon: any = {
    id: '',
    nome: '',
    habilidades: '',
    peso: '',
    altura: '',
    img: '',
    results: [0, 0, 0]

  }
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }
  

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
  ) {}


  buscarPokemon(){
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro']
        this.areaBusca.bairro = ',' + JSON.parse(JSON.stringify(value))['bairro']
        this.areaBusca.localidade = '-' + JSON.parse(JSON.stringify(value))['localidade']
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf']
      })
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.nome = JSON.parse(JSON.stringify(value))['name']
        this.pokemon.habilidades = JSON.parse(JSON.stringify(value))['abilities'].length
        this.pokemon.peso = JSON.parse(JSON.stringify(value))['weight']
        this.pokemon.altura = JSON.parse(JSON.stringify(value))['height']
        this.pokemon.img = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default']
        localStorage.setItem('pokemon', JSON.parse(JSON.stringify(value))['abilities'].length || 0);

        this.pokeAPIService.setAbilities(Number(this.pokemon.habilidades))
        this.pokeAPIService.pokemonsCaptureds.push(structuredClone(this.pokemon))
        this.pokeAPIService.pokemonAtual+=1
      })
      
  }

}