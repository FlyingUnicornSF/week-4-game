$(document).ready(function() {

    var pokemon = {

        moreAttackPt: 8,
        bonusAttackPt: 10,
        pokemonList: [
            {
                "name": "bulbasaur",
                "hp": 120,
                "attackPower": 8,
                "counterAttack": 5,
                "img": "assets/images/bulbasaur.png"
            },
            {
                "name": "charmender",
                "hp": 135,
                "attackPower": 7,
                "counterAttack": 7,
                "img": "assets/images/charmender.png"
            },
            {
                "name": "Squirtle",
                "hp": 115,
                "attackPower": 7,
                "counterAttack": 8,
                "img": "assets/images/Squirtle.jpeg"
            },
            {
                "name": "Pikachu",
                "hp": 148,
                "attackPower": 10,
                "counterAttack": 12,
                "img": "assets/images/pikachu.png"
            },
        ],
        playerList: [],
        
        player: undefined,

        defender: undefined,
        
        loadPokemon: function () {
          this.pokemonList.forEach(function(poke) {
            console.log("i'm in loadpokemon");
            var pokemonLi = pokemon.generatePokemonLi(poke, 'pokemon');
            pokemonLi.hide();
            $("#playerList").append(pokemonLi);
            pokemonLi.fadeIn('slow');
          })//closing this characters forEach function
        },

        loadPlayer: function (poke) {
            console.log("i'm in loadPlayer");
            var pokemonLi = this.generatePokemonLi(poke, 'player');
            pokemonLi.hide();
            $("#player").append(pokemonLi);
            pokemonLi.fadeIn('slow');
        },

        loadDefender: function (poke) {
            console.log("i'm in loadDefender");
            var pokemonLi = this.generatePokemonLi(poke, 'defender');
            pokemonLi.hide();
            $("#defender").append(pokemonLi);
            pokemonLi.fadeIn('slow');
        },
        loadEnemies: function () {
          this.playerList.forEach(function(poke) {
            console.log("i'm in loadpokemon");
            var pokemonLi = pokemon.generatePokemonLi(poke, 'enemies');
            pokemonLi.hide();
            $("#enemiesList").append(pokemonLi);
            pokemonLi.fadeIn('slow');
          })//closing this characters forEach function


          $('.enemies').on('click', function() {
            if (pokemon.defender != undefined) {
                return;
            }
            $('.pickDef').text("");
            var whichPokemon = $(this).attr('title');
            console.log(whichPokemon + "defender");
            
            var defender;
            var defenderIndex;
            pokemon.playerList.forEach(function (poke, index) {
              if(poke.name == whichPokemon) {
                 defender = poke;
                 defenderIndex = index;
              }
            }) //closing forEach
            pokemon.defender = defender;
            pokemon.playerList.splice(defenderIndex, 1);
            pokemon.loadDefender(pokemon.defender);
            $(this).fadeOut('slow', function(){
              $(this).remove();  
            });
            console.log(pokemon.defender.hp)
            console.log(pokemon.player.attackPower)
          }) //on click enemies 
        },    

        generatePokemonLi: function(poke, className) {
            var pokemonLi = $("<li>");
            pokemonLi.addClass(className);
            pokemonLi.attr("title", poke.name);
            pokemonLi.html('<p>'+poke.name+'</p>'+
                           '<img class="pikapika" src="'+poke.img+'" alt="'+poke.name+'">'+
                           '<p class="hp">'+poke.hp+'</p>');
            return pokemonLi;
        },

        compare: function(pokePlayer, pokeDefender) {
          console.log("i'm in compare function")
          if (pokePlayer.hp <= 0) {
            console.log("YOU LOSE");
            //initialize the game 
          } 
          else if (pokeDefender.hp <= 0) {
            console.log("YOU WIN");
            //hide defender 
            this.defender = undefined;
            $('#defender').empty();

            //reload player HP and attackPower

            console.log("reset player")
            pokePlayer.attackPower = pokePlayer.attackPower + this.bonusAttackPt;
            console.log(pokePlayer.attackPower)
            $('.player .hp').text(pokemon.player.attackPower);
           }
          },


    } //closing the main game 

    pokemon.loadPokemon();

    $('.pokemon').on('click', function() {
      var whichPokemon = $(this).attr('title');
      pokemon.pokemonList.forEach(function (poke) {
        var pokeCopy =  Object.assign({}, poke)
        if(pokeCopy.name != whichPokemon) {
            pokemon.playerList.push(pokeCopy);            
        } else {
            pokemon.player = pokeCopy;
        }
      }); //closing for each pokemonList
      console.log(pokemon.playerList);
      console.log(pokemon.player);
      pokemon.loadEnemies();
      $("#player-panel").fadeOut('slow');
      pokemon.loadPlayer(pokemon.player);

    })//closing onclick on pokemon class


    $('.attack').on('click', function() {
        var player = pokemon.player;
        var defender = pokemon.defender;
        if (defender == undefined) {
            $('.pickDef').text("you must pick a defender");
        } else {
            //subtract attack power of the player from defender HP 
            defender.hp = defender.hp - player.attackPower;
            console.log(defender.hp);
            $('.defender .hp').text(defender.hp);
            $('.attack-summary').text('You attacked '+defender.name+' for '+player.attackPower+' damage');
            //subtract counter attack power from the player HP
            player.hp = player.hp - defender.counterAttack;
            $('.player .hp').text(player.hp);
            $('.counter-attack-summary').text(defender.name+' attacked you back for '+defender.counterAttack+' damage');

            //add more attack power 
            player.attackPower =  player.attackPower + pokemon.moreAttackPt;
            console.log(player.attackPower);
            pokemon.compare(player, defender); 
      }

    })

    $('.reset').on('click', function() {

        $('#player').empty();
        pokemon.player = undefined;
        $("#player-panel").fadeIn('slow');

    })
// var audio = new Audio("raven.mp3"); 
// //reference https://ucsf201708fsf1.slack.com/files/accodes/F6VM16997/simple-timer_html.html
// play.audio()

}) //closing  ready function 




