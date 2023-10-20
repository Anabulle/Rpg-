var selectptitle = document.querySelector(".title");
var selectp = document.querySelector(".contenu");
/*création d'une classe Personnage qui va me permettre de crée mes 3 personnages jouables avec les statistique nécéssaire a la mise en place du jeu*/
class Personnage {
    constructor(pseudo, niveau, classe, sante, santemax, mana, manamax, attaque) {
        this.pseudo = pseudo,
            this.classe = classe,
            this.sante = sante,
            this.santemax = santemax,
            this.mana = mana,
            this.manamax = manamax,
            this.attaque = attaque,
            this.niveau = niveau
    }
/*méthodes qui seront communes a tous les personnages, attaquer permet de faire des dégats en fonction de l attaque du personnage et de recuperer entre 0 et i/4 des points de mana*/
    attaquer(ennemy) {
        let selectProgPm = document.querySelector("#" + this.classe + "-pm");
        let pvenemie = document.querySelector("#" + ennemy.classe + "-pv");

        ennemy.sante -= this.attaque;

        this.mana += Math.floor(Math.random() * this.mana/4);
        selectProgPm.value = this.mana;
        pvenemie.value = ennemy.sante;
    }
    /*méthode qui permet de monter de niveau et d augmenter en statistique */
    evoluer() {
        var selectProgPv = document.querySelector("#" + this.classe + "-pv");
        var selectProgPm = document.querySelector("#" + this.classe + "-pm");
        this.niveau++;
        this.santemax += 5;
        this.manamax += 10;
        this.attaque += 2;
        this.sante = this.santemax;
        this.mana = this.manamax;
        selectProgPv.max = this.santemax;
        selectProgPv.value = this.sante;
        selectProgPm.max = this.manamax;
        selectProgPm.value = this.mana;
    }
    /*méthode qui permet de verifier les pv et d afficher les barres en fonction ou d empecher le personnage de jouer en étant mort */
    verifySante() {
        var selectProgPv = document.querySelector("#" + this.classe + "-pv");
        var selectperso = document.querySelector("#" + this.classe + "-img");
        if (this.sante <= (this.santemax / 2)) {
            selectProgPv.className="nes-progress is-warning";
        }
        if (this.sante <= (this.santemax / 4)) {
            selectProgPv.className="nes-progress is-error";
        } 
        
        if (this.sante <= 0) {
            selectperso.className="die"
        }
    }
}
class Magicien extends Personnage {
    constructor(pseudo, magie, niveau, classe, sante, santemax, mana, manamax, attaque) {
        super(pseudo, niveau = 1, classe = 'magicien', sante = 170, santemax = 170, mana = 200, manamax = 200, attaque = 5);
        this.magie = magie
    }

    coupSpecial(personnage) {
        let pvenemie = document.querySelector('#' + personnage.classe + "-pv");
        if (this.mana < 50) {

        } else {
            personnage.sante -= (this.magie + Math.floor(Math.random() * 8));
            this.mana -= 50;
            document.querySelector("#" + this.classe + "-pm").value = this.mana;
            pvenemie.value = personnage.sante;
            console.log(personnage.sante)
        }
    }
    ultime(personnage) {
        let pvenemie = document.querySelector('#' + personnage.classe + "-pv");
        personnage.sante -= (this.magie + Math.floor(Math.random() * 20));
        document.querySelector("#" + this.classe + "-pm").value = this.mana -= 100;
        pvenemie.value = personnage.sante;
    }

}
class Guerrier extends Personnage {
    constructor(pseudo, niveau, classe, sante, santemax, mana, manamax, attaque) {
        super(pseudo, niveau = 1, classe = 'guerrier', sante = 350, santemax = 350, mana = 50, manamax = 50, attaque = 50);
    }
    coupSpecial(personnage) {
        let pvenemie = document.querySelector('#' + personnage.classe + "-pv");
        let jet = Math.floor(Math.random() * 100);
        if (jet >= 90) {
            personnage.sante -= (this.attaque * 2);
        } else {
            personnage.sante -= this.attaque;
        }
        this.mana -= 10;
        document.querySelector("#" + this.classe + "-pm").value = this.mana;
        pvenemie.value = personnage.sante;
    }
    ultime(personnage) {
        let pvenemie = document.querySelector('#' + personnage.classe + "-pv");
        let jet = Math.floor(Math.random() * 100);
        if (jet >= 90) {
            personnage.sante -= (this.attaque * 10);
        } else {
            personnage.sante -= (this.attaque * 2);
        }
        this.mana -= 10;
        document.querySelector("#" + this.classe + "-pm").value = this.mana;
        pvenemie.value = personnage.sante;
    }
}
class Druid extends Personnage {
    constructor(pseudo, niveau, classe, sante, santemax, mana, manamax, attaque) {
        super(pseudo, niveau = 1, classe = 'druide', sante = 150, santemax = 150, mana = 350, manamax = 350, attaque = 10);
    }
    coupSpecial(personnage) {
        if (this.mana >= 60) {
            let pvenemie = document.querySelector('#' + personnage.classe + "-pv");
            let jet = Math.floor(Math.random() * 100);
            if (jet >= 90) {
                personnage.sante += (this.attaque * 2);
                document.querySelector("#" + personnage.classe + "-pv").value = personnage.sante;
            } else {
                personnage.sante += this.attaque;
                document.querySelector("#" + personnage.classe + "-pv").value = personnage.sante;
            }
            if (personnage.sante > personnage.santemax) {
                personnage.sante = personnage.santemax
            };
            this.mana -= 60;
            document.querySelector("#" + this.classe + "-pm").value = this.mana;
            pvenemie.value = personnage.sante;
            console.log(this.mana)

        } else {
            selectptitle.textContent = "attention";
            selectp.textContent = "Vous n'avez plus assez de mana pour cette action";

        }
    }
    ultime(groupe) {
        groupe.map((hero) => {
            hero.sante += this.attaque * 2;
            if (hero.sante > hero.santemax) {
                hero.sante = hero.santemax
            };
            document.querySelector("#" + this.classe + "-pm").value = this.mana;
            var selectProgPv = document.querySelector("#" + this.classe + "-pv");
            selectProgPv.value = hero.sante;
        });
        this.mana -= 100;
    }
}
class Enemie extends Personnage {
    constructor(pseudo, niveau, classe, sante, santemax, mana, manamax, attaque, img) {
        super(pseudo, niveau, classe, sante, santemax, mana, manamax, attaque);
        this.img = img
    }

    coupSpecial(personnage) {

    }

}

mage = new Magicien('Mage', 90);
tank = new Guerrier('Tank');
heal = new Druid('druide');
Bobby = new Enemie('Bobby', 1, "monstre", 400, 400, 200, 200, 50, 'barzork_bourrin.png');
groupe = [mage, tank, heal];