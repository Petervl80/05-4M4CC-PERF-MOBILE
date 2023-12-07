import { Component, Input } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @Input() publicPokemon: any;

  constructor(public photoSevice: PhotoService,
     private pokeAPIService: PokeAPIService,
     ) {}

    public pokemonAdversario: any = {
      nome: '',
      habilidades: 0,
      altura: 0,
      peso: 0
    }
  public resultado: string = ''
  
    public img: string = ''

    userPokemonAbilities: Number = 0

    ionViewWillEnter() {
      this.buscarPokemon();
      setTimeout(()=>this.getResult(), 0)
    }

    buscarPokemon() {
      this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
        this.pokemonAdversario.nome = data.name
        let index: number = 0
        let todasHabilidades: any[] = data.abilities
        for(let i: number = 0; i < todasHabilidades.length; i++) {
          index =  index + 1
        }
        this.pokemonAdversario.habilidades = index
        this.pokemonAdversario.altura = data.height
        this.pokemonAdversario.peso = data.weight
        this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`

        this.userPokemonAbilities = this.pokeAPIService.getAbilities()

        if (
          data.abilities.length >
          Number(localStorage.getItem('pokemon'))
        ) {
          this.resultado = 'GANHOU';
        } else if (
          data.abilities.length ===
          Number(localStorage.getItem('pokemon'))
        ) {
          this.resultado = 'EMPATOU';
        } else {
          this.resultado = 'PERDEU';
        }
      });
    }

    getResult(){
      if(this.userPokemonAbilities>this.pokemonAdversario.habilidades){
        this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[0] += 1
      }
      else if(this.userPokemonAbilities==this.pokemonAdversario.habilidades){
        this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[1] += 1
      }
      else {
        this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[2] += 1 
      }
    }
  
    addPhotoToGallery() {
      this.photoSevice.addNewToGallery();
    }
}
