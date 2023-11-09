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
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  public pokemon: any = {
    nome: '',
    habilidades: '',
    altura: '',
    peso: ''

  }

  public img: string = ''

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCepService: ViaCEPService) {}

  buscarPokemon() {
    this.viaCepService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = JSON.parse(JSON.stringify(value)) ['bairro'];
      this.areaBusca.localidade = JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = JSON.parse(JSON.stringify(value)) ['uf'];
    });

    this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
      this.pokemon.nome = data.name
      let index: number = 0
      let todasHabilidades: any[] = data.abilities
      for(let i: number = 0; i < todasHabilidades.length; i++) {
        index =  index + 1
      }
      this.pokemon.habilidades = index
      this.pokemon.altura = data.height
      this.pokemon.peso = data.weight
      this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
    })

  }

}
