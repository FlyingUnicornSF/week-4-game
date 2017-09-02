 $(document).ready(function() {

        var crystalGame = {

            gameNumber: undefined,
            rando: undefined,
            crystalTotal: 0,
            crystalNumbers: {
                "crystal1": undefined,
                "crystal2": undefined,
                "crystal3": undefined,
                "crystal4": undefined
            },
            lossTotal: 0,
            winTotal: 0,

            initialize: function() {
                //initialize  
                this.crystalTotal = 0;
                $("#crystalTotal").text(this.crystalTotal);
                //randomizer for main game number 
                this.gameNumber = Math.floor(Math.random() * (120 - 19) + 19);

                $('#gameNumber').text(this.gameNumber);

                var that = this;
                //randomizer for each crystal 
                $.each(this.crystalNumbers, function(key, value) {

                    rando = Math.floor(Math.random() * 12 + 1);
                    that.crystalNumbers[key] = rando;

                });
                console.log(this.crystalNumbers);
            }, //closing initialize function 

            addCrystalNumber: function(whichCrystal) {
                console.log(whichCrystal);
                this.crystalTotal = this.crystalNumbers[whichCrystal] + this.crystalTotal;
                console.log(this.crystalTotal);
                $("#crystalTotal").text(this.crystalTotal);
            },

            compareTotal: function() {

                if (this.gameNumber == this.crystalTotal) {
                  console.log("YOU WIN");
                  this.winTotal++;
                  this.initialize();
                  $("#winTotal").text(this.winTotal);

                } else if (this.gameNumber < this.crystalTotal) {
                    console.log("YOU LOSE");
                    this.initialize();
                    this.lossTotal++
                  $("#lossTotal").text(this.lossTotal);
                }

            },


        } //closing the main game 

        crystalGame.initialize()

        $('.crystal').on('click', function() {
            var whichCrystal = $(this).attr('value');
            console.log(whichCrystal);
            crystalGame.addCrystalNumber(whichCrystal);
            crystalGame.compareTotal();
        })
        
        $('#reset').on('click', function() {
            crystalGame.initialize();
            crystalGame.winTotal = 0;
            $("#winTotal").text(crystalGame.winTotal);

            crystalGame.lossTotal = 0;
            $("#lossTotal").text(crystalGame.lossTotal);

        })
        



    }) //closing redy