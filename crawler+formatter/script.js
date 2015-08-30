angular.module('my-app',['ngRoute'])

.config(function($routeProvider){
    $routeProvider
        .when('/',
            {
              controller: 'Ctrl',
              templateUrl: 'main.html'
            })
        .otherwise({ redirectTo: '/' });
})

.controller('Ctrl', function($scope, Svc){

  var json= null;
  var version = '5.11.1'; // v5.14: '5.14.1', v5.11: '5.11.1'
    
  // MATCHES DATA
  var matches=[];
  
  // STATIC DATA
  var championsStaticData={
      "35": {
         "id": 35,
         "title": "the Demon Jester",
         "name": "Shaco",
         "key": "Shaco"
      },
      "36": {
         "id": 36,
         "title": "the Madman of Zaun",
         "name": "Dr. Mundo",
         "key": "DrMundo"
      },
      "33": {
         "id": 33,
         "title": "the Armordillo",
         "name": "Rammus",
         "key": "Rammus"
      },
      "34": {
         "id": 34,
         "title": "the Cryophoenix",
         "name": "Anivia",
         "key": "Anivia"
      },
      "39": {
         "id": 39,
         "title": "the Will of the Blades",
         "name": "Irelia",
         "key": "Irelia"
      },
      "157": {
         "id": 157,
         "title": "the Unforgiven",
         "name": "Yasuo",
         "key": "Yasuo"
      },
      "37": {
         "id": 37,
         "title": "Maven of the Strings",
         "name": "Sona",
         "key": "Sona"
      },
      "38": {
         "id": 38,
         "title": "the Void Walker",
         "name": "Kassadin",
         "key": "Kassadin"
      },
      "154": {
         "id": 154,
         "title": "the Secret Weapon",
         "name": "Zac",
         "key": "Zac"
      },
      "150": {
         "id": 150,
         "title": "the Missing Link",
         "name": "Gnar",
         "key": "Gnar"
      },
      "43": {
         "id": 43,
         "title": "the Enlightened One",
         "name": "Karma",
         "key": "Karma"
      },
      "42": {
         "id": 42,
         "title": "the Daring Bombardier",
         "name": "Corki",
         "key": "Corki"
      },
      "41": {
         "id": 41,
         "title": "the Saltwater Scourge",
         "name": "Gangplank",
         "key": "Gangplank"
      },
      "40": {
         "id": 40,
         "title": "the Storm's Fury",
         "name": "Janna",
         "key": "Janna"
      },
      "201": {
         "id": 201,
         "title": "the Heart of the Freljord",
         "name": "Braum",
         "key": "Braum"
      },
      "22": {
         "id": 22,
         "title": "the Frost Archer",
         "name": "Ashe",
         "key": "Ashe"
      },
      "23": {
         "id": 23,
         "title": "the Barbarian King",
         "name": "Tryndamere",
         "key": "Tryndamere"
      },
      "24": {
         "id": 24,
         "title": "Grandmaster at Arms",
         "name": "Jax",
         "key": "Jax"
      },
      "25": {
         "id": 25,
         "title": "Fallen Angel",
         "name": "Morgana",
         "key": "Morgana"
      },
      "26": {
         "id": 26,
         "title": "the Chronokeeper",
         "name": "Zilean",
         "key": "Zilean"
      },
      "27": {
         "id": 27,
         "title": "the Mad Chemist",
         "name": "Singed",
         "key": "Singed"
      },
      "28": {
         "id": 28,
         "title": "the Widowmaker",
         "name": "Evelynn",
         "key": "Evelynn"
      },
      "29": {
         "id": 29,
         "title": "the Plague Rat",
         "name": "Twitch",
         "key": "Twitch"
      },
      "3": {
         "id": 3,
         "title": "the Sentinel's Sorrow",
         "name": "Galio",
         "key": "Galio"
      },
      "161": {
         "id": 161,
         "title": "the Eye of the Void",
         "name": "Vel'Koz",
         "key": "Velkoz"
      },
      "2": {
         "id": 2,
         "title": "the Berserker",
         "name": "Olaf",
         "key": "Olaf"
      },
      "1": {
         "id": 1,
         "title": "the Dark Child",
         "name": "Annie",
         "key": "Annie"
      },
      "7": {
         "id": 7,
         "title": "the Deceiver",
         "name": "LeBlanc",
         "key": "Leblanc"
      },
      "30": {
         "id": 30,
         "title": "the Deathsinger",
         "name": "Karthus",
         "key": "Karthus"
      },
      "6": {
         "id": 6,
         "title": "the Headsman's Pride",
         "name": "Urgot",
         "key": "Urgot"
      },
      "32": {
         "id": 32,
         "title": "the Sad Mummy",
         "name": "Amumu",
         "key": "Amumu"
      },
      "5": {
         "id": 5,
         "title": "the Seneschal of Demacia",
         "name": "Xin Zhao",
         "key": "XinZhao"
      },
      "31": {
         "id": 31,
         "title": "the Terror of the Void",
         "name": "Cho'Gath",
         "key": "Chogath"
      },
      "4": {
         "id": 4,
         "title": "the Card Master",
         "name": "Twisted Fate",
         "key": "TwistedFate"
      },
      "9": {
         "id": 9,
         "title": "the Harbinger of Doom",
         "name": "Fiddlesticks",
         "key": "FiddleSticks"
      },
      "8": {
         "id": 8,
         "title": "the Crimson Reaper",
         "name": "Vladimir",
         "key": "Vladimir"
      },
      "19": {
         "id": 19,
         "title": "the Blood Hunter",
         "name": "Warwick",
         "key": "Warwick"
      },
      "17": {
         "id": 17,
         "title": "the Swift Scout",
         "name": "Teemo",
         "key": "Teemo"
      },
      "18": {
         "id": 18,
         "title": "the Yordle Gunner",
         "name": "Tristana",
         "key": "Tristana"
      },
      "15": {
         "id": 15,
         "title": "the Battle Mistress",
         "name": "Sivir",
         "key": "Sivir"
      },
      "16": {
         "id": 16,
         "title": "the Starchild",
         "name": "Soraka",
         "key": "Soraka"
      },
      "13": {
         "id": 13,
         "title": "the Rogue Mage",
         "name": "Ryze",
         "key": "Ryze"
      },
      "14": {
         "id": 14,
         "title": "The Undead Juggernaut",
         "name": "Sion",
         "key": "Sion"
      },
      "11": {
         "id": 11,
         "title": "the Wuju Bladesman",
         "name": "Master Yi",
         "key": "MasterYi"
      },
      "12": {
         "id": 12,
         "title": "the Minotaur",
         "name": "Alistar",
         "key": "Alistar"
      },
      "21": {
         "id": 21,
         "title": "the Bounty Hunter",
         "name": "Miss Fortune",
         "key": "MissFortune"
      },
      "20": {
         "id": 20,
         "title": "the Yeti Rider",
         "name": "Nunu",
         "key": "Nunu"
      },
      "107": {
         "id": 107,
         "title": "the Pridestalker",
         "name": "Rengar",
         "key": "Rengar"
      },
      "106": {
         "id": 106,
         "title": "the Thunder's Roar",
         "name": "Volibear",
         "key": "Volibear"
      },
      "105": {
         "id": 105,
         "title": "the Tidal Trickster",
         "name": "Fizz",
         "key": "Fizz"
      },
      "104": {
         "id": 104,
         "title": "the Outlaw",
         "name": "Graves",
         "key": "Graves"
      },
      "103": {
         "id": 103,
         "title": "the Nine-Tailed Fox",
         "name": "Ahri",
         "key": "Ahri"
      },
      "99": {
         "id": 99,
         "title": "the Lady of Luminosity",
         "name": "Lux",
         "key": "Lux"
      },
      "102": {
         "id": 102,
         "title": "the Half-Dragon",
         "name": "Shyvana",
         "key": "Shyvana"
      },
      "101": {
         "id": 101,
         "title": "the Magus Ascendant",
         "name": "Xerath",
         "key": "Xerath"
      },
      "412": {
         "id": 412,
         "title": "the Chain Warden",
         "name": "Thresh",
         "key": "Thresh"
      },
      "98": {
         "id": 98,
         "title": "Eye of Twilight",
         "name": "Shen",
         "key": "Shen"
      },
      "222": {
         "id": 222,
         "title": "the Loose Cannon",
         "name": "Jinx",
         "key": "Jinx"
      },
      "96": {
         "id": 96,
         "title": "the Mouth of the Abyss",
         "name": "Kog'Maw",
         "key": "KogMaw"
      },
      "92": {
         "id": 92,
         "title": "the Exile",
         "name": "Riven",
         "key": "Riven"
      },
      "91": {
         "id": 91,
         "title": "the Blade's Shadow",
         "name": "Talon",
         "key": "Talon"
      },
      "90": {
         "id": 90,
         "title": "the Prophet of the Void",
         "name": "Malzahar",
         "key": "Malzahar"
      },
      "429": {
         "id": 429,
         "title": "the Spear of Vengeance",
         "name": "Kalista",
         "key": "Kalista"
      },
      "10": {
         "id": 10,
         "title": "The Judicator",
         "name": "Kayle",
         "key": "Kayle"
      },
      "421": {
         "id": 421,
         "title": "the Void Burrower",
         "name": "Rek'Sai",
         "key": "RekSai"
      },
      "89": {
         "id": 89,
         "title": "the Radiant Dawn",
         "name": "Leona",
         "key": "Leona"
      },
      "79": {
         "id": 79,
         "title": "the Rabble Rouser",
         "name": "Gragas",
         "key": "Gragas"
      },
      "117": {
         "id": 117,
         "title": "the Fae Sorceress",
         "name": "Lulu",
         "key": "Lulu"
      },
      "114": {
         "id": 114,
         "title": "the Grand Duelist",
         "name": "Fiora",
         "key": "Fiora"
      },
      "78": {
         "id": 78,
         "title": "the Iron Ambassador",
         "name": "Poppy",
         "key": "Poppy"
      },
      "115": {
         "id": 115,
         "title": "the Hexplosives Expert",
         "name": "Ziggs",
         "key": "Ziggs"
      },
      "77": {
         "id": 77,
         "title": "the Spirit Walker",
         "name": "Udyr",
         "key": "Udyr"
      },
      "112": {
         "id": 112,
         "title": "the Machine Herald",
         "name": "Viktor",
         "key": "Viktor"
      },
      "113": {
         "id": 113,
         "title": "the Winter's Wrath",
         "name": "Sejuani",
         "key": "Sejuani"
      },
      "110": {
         "id": 110,
         "title": "the Arrow of Retribution",
         "name": "Varus",
         "key": "Varus"
      },
      "111": {
         "id": 111,
         "title": "the Titan of the Depths",
         "name": "Nautilus",
         "key": "Nautilus"
      },
      "119": {
         "id": 119,
         "title": "the Glorious Executioner",
         "name": "Draven",
         "key": "Draven"
      },
      "432": {
         "id": 432,
         "title": "the Wandering Caretaker",
         "name": "Bard",
         "key": "Bard"
      },
      "245": {
         "id": 245,
         "title": "the Boy Who Shattered Time",
         "name": "Ekko",
         "key": "Ekko"
      },
      "82": {
         "id": 82,
         "title": "the Master of Metal",
         "name": "Mordekaiser",
         "key": "Mordekaiser"
      },
      "83": {
         "id": 83,
         "title": "the Gravedigger",
         "name": "Yorick",
         "key": "Yorick"
      },
      "80": {
         "id": 80,
         "title": "the Artisan of War",
         "name": "Pantheon",
         "key": "Pantheon"
      },
      "81": {
         "id": 81,
         "title": "the Prodigal Explorer",
         "name": "Ezreal",
         "key": "Ezreal"
      },
      "86": {
         "id": 86,
         "title": "The Might of Demacia",
         "name": "Garen",
         "key": "Garen"
      },
      "84": {
         "id": 84,
         "title": "the Fist of Shadow",
         "name": "Akali",
         "key": "Akali"
      },
      "85": {
         "id": 85,
         "title": "the Heart of the Tempest",
         "name": "Kennen",
         "key": "Kennen"
      },
      "67": {
         "id": 67,
         "title": "the Night Hunter",
         "name": "Vayne",
         "key": "Vayne"
      },
      "126": {
         "id": 126,
         "title": "the Defender of Tomorrow",
         "name": "Jayce",
         "key": "Jayce"
      },
      "69": {
         "id": 69,
         "title": "the Serpent's Embrace",
         "name": "Cassiopeia",
         "key": "Cassiopeia"
      },
      "127": {
         "id": 127,
         "title": "the Ice Witch",
         "name": "Lissandra",
         "key": "Lissandra"
      },
      "68": {
         "id": 68,
         "title": "the Mechanized Menace",
         "name": "Rumble",
         "key": "Rumble"
      },
      "121": {
         "id": 121,
         "title": "the Voidreaver",
         "name": "Kha'Zix",
         "key": "Khazix"
      },
      "122": {
         "id": 122,
         "title": "the Hand of Noxus",
         "name": "Darius",
         "key": "Darius"
      },
      "120": {
         "id": 120,
         "title": "the Shadow of War",
         "name": "Hecarim",
         "key": "Hecarim"
      },
      "72": {
         "id": 72,
         "title": "the Crystal Vanguard",
         "name": "Skarner",
         "key": "Skarner"
      },
      "236": {
         "id": 236,
         "title": "the Purifier",
         "name": "Lucian",
         "key": "Lucian"
      },
      "74": {
         "id": 74,
         "title": "the Revered Inventor",
         "name": "Heimerdinger",
         "key": "Heimerdinger"
      },
      "75": {
         "id": 75,
         "title": "the Curator of the Sands",
         "name": "Nasus",
         "key": "Nasus"
      },
      "238": {
         "id": 238,
         "title": "the Master of Shadows",
         "name": "Zed",
         "key": "Zed"
      },
      "76": {
         "id": 76,
         "title": "the Bestial Huntress",
         "name": "Nidalee",
         "key": "Nidalee"
      },
      "134": {
         "id": 134,
         "title": "the Dark Sovereign",
         "name": "Syndra",
         "key": "Syndra"
      },
      "133": {
         "id": 133,
         "title": "Demacia's Wings",
         "name": "Quinn",
         "key": "Quinn"
      },
      "59": {
         "id": 59,
         "title": "the Exemplar of Demacia",
         "name": "Jarvan IV",
         "key": "JarvanIV"
      },
      "58": {
         "id": 58,
         "title": "the Butcher of the Sands",
         "name": "Renekton",
         "key": "Renekton"
      },
      "57": {
         "id": 57,
         "title": "the Twisted Treant",
         "name": "Maokai",
         "key": "Maokai"
      },
      "56": {
         "id": 56,
         "title": "the Eternal Nightmare",
         "name": "Nocturne",
         "key": "Nocturne"
      },
      "55": {
         "id": 55,
         "title": "the Sinister Blade",
         "name": "Katarina",
         "key": "Katarina"
      },
      "64": {
         "id": 64,
         "title": "the Blind Monk",
         "name": "Lee Sin",
         "key": "LeeSin"
      },
      "62": {
         "id": 62,
         "title": "the Monkey King",
         "name": "Wukong",
         "key": "MonkeyKing"
      },
      "63": {
         "id": 63,
         "title": "the Burning Vengeance",
         "name": "Brand",
         "key": "Brand"
      },
      "268": {
         "id": 268,
         "title": "the Emperor of the Sands",
         "name": "Azir",
         "key": "Azir"
      },
      "267": {
         "id": 267,
         "title": "the Tidecaller",
         "name": "Nami",
         "key": "Nami"
      },
      "60": {
         "id": 60,
         "title": "The Spider Queen",
         "name": "Elise",
         "key": "Elise"
      },
      "131": {
         "id": 131,
         "title": "Scorn of the Moon",
         "name": "Diana",
         "key": "Diana"
      },
      "61": {
         "id": 61,
         "title": "the Lady of Clockwork",
         "name": "Orianna",
         "key": "Orianna"
      },
      "266": {
         "id": 266,
         "title": "the Darkin Blade",
         "name": "Aatrox",
         "key": "Aatrox"
      },
      "143": {
         "id": 143,
         "title": "Rise of the Thorns",
         "name": "Zyra",
         "key": "Zyra"
      },
      "48": {
         "id": 48,
         "title": "the Troll King",
         "name": "Trundle",
         "key": "Trundle"
      },
      "45": {
         "id": 45,
         "title": "the Tiny Master of Evil",
         "name": "Veigar",
         "key": "Veigar"
      },
      "44": {
         "id": 44,
         "title": "the Gem Knight",
         "name": "Taric",
         "key": "Taric"
      },
      "51": {
         "id": 51,
         "title": "the Sheriff of Piltover",
         "name": "Caitlyn",
         "key": "Caitlyn"
      },
      "53": {
         "id": 53,
         "title": "the Great Steam Golem",
         "name": "Blitzcrank",
         "key": "Blitzcrank"
      },
      "54": {
         "id": 54,
         "title": "Shard of the Monolith",
         "name": "Malphite",
         "key": "Malphite"
      },
      "254": {
         "id": 254,
         "title": "the Piltover Enforcer",
         "name": "Vi",
         "key": "Vi"
      },
      "50": {
         "id": 50,
         "title": "the Master Tactician",
         "name": "Swain",
         "key": "Swain"
      }
   };
  var itemsStaticData={
      "3725": {
         "id": 3725,
         "description": "<stats>+300 Health<br>+25% Bonus Health<\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 15 (+0.6 per champion level) magic damage a second to nearby enemies. Deals 100% bonus damage to monsters. ",
         "name": "Enchantment: Cinderhulk",
         "group": "JungleItems"
      },
      "3724": {
         "id": 3724,
         "description": "<stats>+80 Ability Power<br>+20% Cooldown Reduction<\/stats>",
         "name": "Enchantment: Magus",
         "group": "JungleItems"
      },
      "2009": {
         "id": 2009,
         "description": "<consumable>Click to Consume:<\/consumable> Restores 80 Health and 50 Mana over 10 seconds.",
         "name": "Total Biscuit of Rejuvenation"
      },
      "3089": {
         "id": 3089,
         "plaintext": "Massively increases Ability Power",
         "description": "<stats>+120 Ability Power  <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Increases Ability Power by 30%.",
         "name": "Rabadon's Deathcap"
      },
      "3723": {
         "id": 3723,
         "description": "<stats>+40 Attack Damage<br>+10% Cooldown Reduction<br>+10 Armor Penetration<\/stats>",
         "name": "Enchantment: Warrior",
         "group": "JungleItems"
      },
      "3722": {
         "id": 3722,
         "description": "<stats>+50% Attack Speed<br>+25 Magic Damage on Hit<\/stats><br><br><passive>Passive - Devouring:<\/passive> Killing large monsters increases the magic damage of this item by +1. Champion kills or assists increases the magic damage of this item by +2.",
         "name": "Enchantment: Devourer",
         "group": "JungleItems"
      },
      "3087": {
         "id": 3087,
         "plaintext": "Movement builds charges that release chain lightning on basic attack",
         "description": "<stats>+40% Attack Speed<br>+20% Critical Strike Chance<br>+6% Movement Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants Static Charges upon moving or attacking. At 100 Charges, basic attacking expends all Charges to deal 100 bonus magic damage to up to 4 targets on hit (this damage can critically strike).",
         "name": "Statikk Shiv"
      },
      "3721": {
         "id": 3721,
         "description": "<stats>+300 Health<br>+25% Bonus Health<\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 15 (+0.6 per champion level) magic damage a second to nearby enemies. Deals 100% bonus damage to monsters. ",
         "name": "Enchantment: Cinderhulk",
         "group": "JungleItems"
      },
      "2004": {
         "id": 2004,
         "plaintext": "Consume to restore Mana over time",
         "description": "<groupLimit>Limited to 5 at one time.<\/groupLimit><br><br><consumable>Click to Consume:<\/consumable> <mana>Restores 100 Mana over 15 seconds.<\/mana>",
         "name": "Mana Potion",
         "group": "ManaPotion"
      },
      "3086": {
         "id": 3086,
         "plaintext": "Slight bonuses to Critical Strike Chance, Movement Speed and Attack Speed",
         "description": "<stats>+20% Attack Speed<br>+10% Critical Strike Chance<br>+5% Movement Speed<\/stats>",
         "name": "Zeal"
      },
      "3720": {
         "id": 3720,
         "description": "<stats>+80 Ability Power<br>+20% Cooldown Reduction<\/stats>",
         "name": "Enchantment: Magus",
         "group": "JungleItems"
      },
      "3085": {
         "id": 3085,
         "plaintext": "Ranged attacks fire two bolts at nearby enemies",
         "description": "<stats>+70% Attack Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> When basic attacking, bolts are fired at up to 2 enemies near the target, each dealing (50% of Attack Damage) physical damage. These bolts apply on-hit effects.<br><unique>UNIQUE Passive:<\/unique> Basic attacks deal an additional 10 physical damage on hit.<br> ",
         "name": "Runaan's Hurricane (Ranged Only)"
      },
      "3280": {
         "id": 3280,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3084": {
         "id": 3084,
         "plaintext": "Restores Health on kill or assist",
         "description": "<stats>+800 Health<br>+100% Base Health Regen <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Upon champion kill or assist, restores 300 Health over 5 seconds.",
         "name": "Overlord's Bloodmail"
      },
      "3083": {
         "id": 3083,
         "plaintext": "Grants massive Health and Health Regen",
         "description": "<stats>+800 Health<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Restores 1% of maximum Health every 5 seconds. Health restore increases to 3% of maximum Health if damage hasn't been taken within 8 seconds.",
         "name": "Warmog's Armor"
      },
      "2003": {
         "id": 2003,
         "plaintext": "Consume to restore Health over time",
         "description": "<groupLimit>Limited to 5 at one time.<\/groupLimit><br><br><consumable>Click to Consume:<\/consumable> Restores 150 Health over 15 seconds.",
         "name": "Health Potion",
         "group": "HealthPotion"
      },
      "3082": {
         "id": 3082,
         "plaintext": "Slows Attack Speed of enemy champions when receiving basic attacks",
         "description": "<stats>+45 Armor<\/stats><br><br><unique>UNIQUE Passive - Cold Steel:<\/unique> When hit by basic attacks, reduces the attacker's Attack Speed by 15% for 1 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Warden's Mail"
      },
      "3282": {
         "id": 3282,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3281": {
         "id": 3281,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3284": {
         "id": 3284,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3283": {
         "id": 3283,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "3286": {
         "id": 3286,
         "plaintext": "Increases Ability Power and Movement Speed",
         "description": "<stats>+100 Ability Power<br>+7% Movement Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Gain charges upon moving or casting. At 100 charges, the next spell hit expends all charges to deal 100 (+10% AP) bonus magic damage to up to 4 targets on hit.",
         "name": "Luden's Echo"
      },
      "3285": {
         "id": 3285,
         "plaintext": "Increases Ability Power and Movement Speed",
         "description": "<stats>+120 Ability Power<br>+7% Movement Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Gain charges upon moving or casting. At 100 charges, the next spell hit expends all charges to deal 100 (+10% AP) bonus magic damage to up to 4 targets on hit.",
         "name": "Luden's Echo"
      },
      "3726": {
         "id": 3726,
         "description": "<stats>+50% Attack Speed<br>+25 Magic Damage on Hit<\/stats><br><br><passive>Passive - Devouring:<\/passive> Killing large monsters increases the magic damage of this item by +1. Champion kills or assists increases the magic damage of this item by +2.",
         "name": "Enchantment: Devourer",
         "group": "JungleItems"
      },
      "3278": {
         "id": 3278,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "3279": {
         "id": 3279,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "2010": {
         "id": 2010,
         "description": "<consumable>Click to Consume:<\/consumable> Restores 20 health and 10 mana immediately and then 150 Health over 15 seconds.",
         "name": "Total Biscuit of Rejuvenation",
         "group": "HealthPotion"
      },
      "3711": {
         "id": 3711,
         "plaintext": "Makes your Smite give extra gold from the enemy jungle",
         "description": "<stats>+30 Bonus Gold per Large Monster Kill<\/stats><br><passive>Passive - Scavenging Smite:<\/passive> When you Smite a large monster in the enemy jungle, you gain half a charge of Smite. If you kill that monster, you gain +20 bonus Gold, and you gain 175% increased Movement Speed decaying over 2 seconds.<br><br><passive>Passive - Jungler:<\/passive> Deal 45 additional magic damage to monsters over 2 seconds and gain 10 Health Regen and 5 Mana Regen per second while in combat with monsters.<br><br><groupLimit>Limited to 1 Jungle item<\/groupLimit>",
         "name": "Poacher's Knife",
         "group": "JungleItems"
      },
      "3098": {
         "id": 3098,
         "plaintext": "Grants gold when you damage an enemy with a Spell or Attack",
         "description": "<stats>+10 Ability Power<br>+2 Gold per 10 seconds<br><mana>+50% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive - Tribute:<\/unique> Spells and basic attacks against champions or buildings deal 15 additional damage and grant 10 Gold. This can occur up to 3 times every 30 seconds. Killing a minion disables this passive for 12 seconds.<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Frostfang",
         "group": "GoldBase"
      },
      "3714": {
         "id": 3714,
         "description": "<stats>+40 Attack Damage<br>+10% Cooldown Reduction<br>+10 Armor Penetration<\/stats>",
         "name": "Enchantment: Warrior",
         "group": "JungleItems"
      },
      "3713": {
         "id": 3713,
         "plaintext": "Makes your Smite hit all monsters in an area, stunning them.",
         "description": "<stats>+30 Bonus Gold per Large Monster Kill<\/stats><br><passive>Passive - Blasting Smite:<\/passive> Smite deals damage in an area, dealing half damage to all monsters and enemy minions near the target and stuns them for 1.5 seconds. Casting Smite on a monster restores 15% of missing Health and Mana. <br><br><passive>Passive - Jungler:<\/passive> Deal 45 additional magic damage to monsters over 2 seconds and gain 10 Health Regen and 5 Mana Regen per second while in combat with monsters.<br><br><groupLimit>Limited to 1 Jungle item<\/groupLimit>",
         "name": "Ranger's Trailblazer",
         "group": "JungleItems"
      },
      "3290": {
         "id": 3290,
         "plaintext": "Summon wraiths to slow and reveal enemy champions",
         "description": "<stats>+80 Ability Power<br>+10% Cooldown Reduction<br>+6% Movement Speed<\/stats><br><br><unique>UNIQUE Passive - Trap Detection:<\/unique> Nearby stealthed enemy traps are revealed.<br><active>UNIQUE Active - Hunt:<\/active> Summons up to 2 invulnerable ghosts that seek out the 2 nearest enemy champions for 6 seconds. If a ghost reaches its target, it reveals the target and reduces their Movement Speed by 40% for 2.5 seconds.<br><br>If a ghost cannot find a target, it tries to return to the caster. Ghosts that successfully return in this way reduce the item's cooldown by 20 seconds (60 second cooldown).",
         "name": "Twin Shadows"
      },
      "3710": {
         "id": 3710,
         "description": "<stats>+50% Attack Speed<br>+25 Magic Damage on Hit<\/stats><br><br><passive>Passive - Devouring:<\/passive> Killing large monsters increases the magic damage of this item by +1. Champion kills or assists increases the magic damage of this item by +2.",
         "name": "Enchantment: Devourer",
         "group": "JungleItems"
      },
      "3097": {
         "id": 3097,
         "plaintext": "Periodically kill enemy minions to heal and grant gold to a nearby ally",
         "description": "<stats>+175 Health<br>+50% Base Health Regen <\/stats><br><br><unique>UNIQUE Passive - Spoils of War:<\/unique> Melee basic attacks execute minions below 240 Health. Killing a minion heals the owner and the nearest allied champion for 50 Health and grants them kill Gold.<br><br>These effects require a nearby allied champion. Recharges every 30 seconds. Max 3 charges.<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Targon's Brace",
         "group": "GoldBase"
      },
      "3096": {
         "id": 3096,
         "plaintext": "Grants gold when nearby enemy minions die, Health Regen and Mana Regen",
         "description": "<stats>+25% Base Health Regen <br><mana>+50% Base Mana Regen <br><\/mana>+10 Movement Speed<br>+2 Gold per 10 seconds<\/stats><br><br><unique>UNIQUE Passive - Favor:<\/unique> Being near a minion death without dealing the killing blow grants 4 Gold and 10 Health.<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit><br><br><i><font color='#447777'>''The medallion shines with the glory of a thousand voices when exposed to the sun.'' - Historian Shurelya, 22 June, 24 CLE<\/font><\/i><br><br>",
         "name": "Nomad's Medallion",
         "group": "GoldBase"
      },
      "3091": {
         "id": 3091,
         "plaintext": "Deals bonus magic damage on basic attacks",
         "description": "<stats>+50% Attack Speed<br>+30 Magic Resist<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Basic attacks deal 42 bonus magic damage on hit.<br><unique>UNIQUE Passive:<\/unique> Basic attacks steal 5 Magic Resist from the target on hit (stacks up to 5 times.)",
         "name": "Wit's End"
      },
      "3719": {
         "id": 3719,
         "description": "<stats>+40 Attack Damage<br>+10% Cooldown Reduction<br>+10 Armor Penetration<\/stats>",
         "name": "Enchantment: Warrior",
         "group": "JungleItems"
      },
      "3090": {
         "id": 3090,
         "plaintext": "Massively increases Ability Power and can be activated to enter stasis",
         "description": "<stats>+100 Ability Power<br>+45 Armor  <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Increases Ability Power by 25%<br><active>UNIQUE Active:<\/active> Champion becomes invulnerable and untargetable for 2.5 seconds, but is unable to move, attack, cast spells, or use items during this time (90 second cooldown).",
         "name": "Wooglet's Witchcap"
      },
      "3093": {
         "id": 3093,
         "plaintext": "Grants gold over time and additional gold on kill",
         "description": "<stats>+10% Critical Strike Chance<\/stats><br><br><unique>UNIQUE Passive - Avarice:<\/unique> +3 Gold per 10 seconds<br><unique>UNIQUE Passive - Greed:<\/unique> Grants 2 Gold upon killing a unit.<br><br><groupLimit>May be bought with another Gold Income item<\/groupLimit>",
         "name": "Avarice Blade"
      },
      "3092": {
         "id": 3092,
         "plaintext": "Chills target area, damaging and slowing enemies caught in the path or explosion",
         "description": "<stats>+50 Ability Power<br>+10% Cooldown Reduction<br>+2 Gold per 10 seconds<br><mana>+50% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive - Tribute:<\/unique> Spells and basic attacks against champions or buildings deal 15 additional damage and grant 10 Gold. This can occur up to three times every 30 seconds.<br><active>UNIQUE Active:<\/active> Fires an ice lance that explodes dealing 50 (+5 per champion level) magic damage to nearby enemies and slowing their Movement Speed by 80%, decaying over 2 seconds (60 second cooldown).<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Frost Queen's Claim",
         "group": "GoldBase"
      },
      "3716": {
         "id": 3716,
         "description": "<stats>+80 Ability Power<br>+20% Cooldown Reduction<\/stats>",
         "name": "Enchantment: Magus",
         "group": "JungleItems"
      },
      "3715": {
         "id": 3715,
         "plaintext": "Lets your Smite mark Champions, giving you combat power against them.",
         "description": "<stats>+30 Bonus Gold per Large Monster Kill<\/stats><br><passive>Passive - Challenging Smite:<\/passive> Smite can be cast on enemy champions, marking them for 4 seconds. While marked, basic attacks deal true damage over 3 seconds, you have vision of them, and their damage to you is reduced by 20%.<br><br><passive>Passive - Jungler:<\/passive> Deal 45 additional magic damage to monsters over 2 seconds and gain 10 Health Regen and 5 Mana Regen per second while in combat with monsters.<br><br><groupLimit>Limited to 1 Jungle item<\/groupLimit>",
         "name": "Skirmisher's Sabre",
         "group": "JungleItems"
      },
      "3718": {
         "id": 3718,
         "description": "<stats>+50% Attack Speed<br>+25 Magic Damage on Hit<\/stats><br><br><passive>Passive - Devouring:<\/passive> Killing large monsters increases the magic damage of this item by +1. Champion kills or assists increases the magic damage of this item by +2.",
         "name": "Enchantment: Devourer",
         "group": "JungleItems"
      },
      "3717": {
         "id": 3717,
         "description": "<stats>+300 Health<br>+25% Bonus Health<\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 15 (+0.6 per champion level) magic damage a second to nearby enemies. Deals 100% bonus damage to monsters. ",
         "name": "Enchantment: Cinderhulk",
         "group": "JungleItems"
      },
      "3599": {
         "id": 3599,
         "plaintext": "Kalista's spear that binds an Oathsworn Ally.",
         "description": "<stats><\/stats><br><passive>Active:<\/passive> Offer to bind with an ally for the remainder of the game, becoming Oathsworn Allies. Oathsworn empowers you both while near one another.",
         "name": "The Black Spear",
         "group": "TheBlackSpear"
      },
      "1075": {
         "id": 1075,
         "plaintext": "Good starting item for attackers",
         "description": "<stats>+70 Health<br>+7 Attack Damage<br>+3% Life Steal<\/stats><br><br><groupLimit>Limited to 2 Doran's items on Showdown<\/groupLimit><br><br>",
         "name": "Doran's Blade (Showdown)",
         "group": "DoransShowdown"
      },
      "1074": {
         "id": 1074,
         "plaintext": "Good defensive starting item",
         "description": "<stats>+100 Health<br>+10 Health Regen per 5 seconds<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Blocks 8 damage from champion basic attacks.<br><br><groupLimit>Limited to 2 Doran's items on Showdown<\/groupLimit><br><br>",
         "name": "Doran's Shield (Showdown)",
         "group": "DoransShowdown"
      },
      "1076": {
         "id": 1076,
         "plaintext": "Good starting item for casters",
         "description": "<stats>+60 Health<br>+15 Ability Power<br>+3 Mana Regen per 5 seconds<\/stats><br><br><passive>Passive:<\/passive> Restores 4 Mana upon killing a unit.<br><br><groupLimit>Limited to 2 Doran's items on Showdown<\/groupLimit><br><br>",
         "name": "Doran's Ring (Showdown)",
         "group": "DoransShowdown"
      },
      "1063": {
         "id": 1063,
         "plaintext": "Good starting item for casters",
         "description": "<stats>+35 Ability Power<\/stats><br><br><unique>Passive :<\/unique> <mana>+6 Mana Regen per 5 seconds<\/mana><br><unique>UNIQUE Passive - Prospector:<\/unique> +150 Health<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Prospector's Ring"
      },
      "1062": {
         "id": 1062,
         "plaintext": "Good starting item for attackers",
         "description": "<stats>+16 Attack Damage<br>+15% Attack Speed <\/stats><br><br><unique>UNIQUE Passive - Prospector:<\/unique> +150 Health<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Prospector's Blade"
      },
      "1058": {
         "id": 1058,
         "plaintext": "Greatly increases Ability Power",
         "description": "<stats>+80 Ability Power<\/stats>",
         "name": "Needlessly Large Rod"
      },
      "1056": {
         "id": 1056,
         "plaintext": "Good starting item for casters",
         "description": "<stats>+60 Health<br>+15 Ability Power<\/stats><br><br><passive>Passive:<\/passive> <mana>+3 Mana Regen per 5 seconds.<br><passive>Passive:<\/passive> Restores 4 Mana upon killing a unit.<\/mana>",
         "name": "Doran's Ring"
      },
      "1057": {
         "id": 1057,
         "plaintext": "Moderately increases Magic Resist",
         "description": "<stats>+45 Magic Resist<\/stats>",
         "name": "Negatron Cloak"
      },
      "3110": {
         "id": 3110,
         "plaintext": "Massively increases Armor and slows enemy basic attacks",
         "description": "<stats>+100 Armor<br>+20% Cooldown Reduction<br><mana>+400 Mana<\/mana><\/stats><br><br><aura>UNIQUE Aura:<\/aura> Reduces the Attack Speed of nearby enemies by 15%.",
         "name": "Frozen Heart"
      },
      "3111": {
         "id": 3111,
         "plaintext": "Increases Movement Speed and reduces duration of disabling effects",
         "description": "<stats>+25 Magic Resist<\/stats><br><br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +45 Movement Speed<br><unique>UNIQUE Passive - Tenacity:<\/unique> Reduces the duration of stuns, slows, taunts, fears, silences, blinds, polymorphs, and immobilizes by 35%.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Mercury's Treads"
      },
      "3112": {
         "id": 3112,
         "plaintext": "Grants a shield when out of combat",
         "description": "<stats>+70 Magic Resist<br>+100% Base Health Regeneration <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants a shield that absorbs up to 30 (+10 per level) damage. The shield will refresh after 9 seconds without receiving damage.",
         "name": "Orb of Winter"
      },
      "3106": {
         "id": 3106,
         "plaintext": "Basic attacks kill minions and monsters quickly",
         "description": "<stats>+15% Attack Speed<\/stats><br><br><unique>UNIQUE Passive - Maim:<\/unique> Basic attacks against monsters deal 50 bonus magic damage and heal 8 Health on hit.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Madred's Razors"
      },
      "3108": {
         "id": 3108,
         "plaintext": "Increases Ability Power and Cooldown Reduction",
         "description": "<stats>+30 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction",
         "name": "Fiendish Codex"
      },
      "3102": {
         "id": 3102,
         "plaintext": "Periodically blocks enemy abilities",
         "description": "<stats>+450 Health<br>+55 Magic Resist<br>+100% Base Health Regeneration <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants a spell shield that blocks the next enemy ability. This shield refreshes after no damage is taken from enemy champions for 40 seconds.",
         "name": "Banshee's Veil"
      },
      "3105": {
         "id": 3105,
         "plaintext": "Improves defenses for nearby allies",
         "description": "<stats>+200 Health<br>+20 Magic Resist<\/stats><br><br><aura>UNIQUE Aura - Legion:<\/aura> Grants nearby allies +20 Magic Resist and +75% Base Health Regen.<br><br><i>(Unique Auras with the same name don't stack.)<\/i>",
         "name": "Aegis of the Legion"
      },
      "3104": {
         "id": 3104,
         "plaintext": "Critical strikes cause your target to bleed and be revealed.",
         "description": "<stats>+80 Attack Damage<br>+25% Critical Strike Chance<\/stats><br><unique>UNIQUE Passive:<\/unique> Critical Strikes cause enemies to bleed for an additional 150% of bonus Attack Damage as magic damage over 3 seconds and reveal them for the duration.",
         "name": "Lord Van Damm's Pillager"
      },
      "3250": {
         "id": 3250,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3100": {
         "id": 3100,
         "plaintext": "Grants a bonus to next attack after spell cast",
         "description": "<stats>+80 Ability Power<br>+5% Movement Speed<br><mana>+250 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive - Spellblade:<\/unique> After using an ability, the next basic attack deals 75% Base Attack Damage (+50% of Ability Power) bonus magic damage on hit (1.5 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Lich Bane"
      },
      "3251": {
         "id": 3251,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3101": {
         "id": 3101,
         "plaintext": "Increased Attack Speed and Cooldown Reduction",
         "description": "<stats>+40% Attack Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction",
         "name": "Stinger"
      },
      "3254": {
         "id": 3254,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3255": {
         "id": 3255,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3252": {
         "id": 3252,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3253": {
         "id": 3253,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "3263": {
         "id": 3263,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "3706": {
         "id": 3706,
         "plaintext": "Lets your Smite slow Champions",
         "description": "<stats>+30 Bonus Gold per Large Monster Kill<\/stats><br><passive>Passive - Chilling Smite:<\/passive> Smite can be cast on enemy champions, dealing reduced true damage and stealing 20% movement speed for 2 seconds. <br><br><passive>Passive - Jungler:<\/passive> Deal 45 additional magic damage to monsters over 2 seconds and gain 10 Health Regen and 5 Mana Regen per second while in combat with monsters.<br><br><groupLimit>Limited to 1 Jungle item<\/groupLimit>",
         "name": "Stalker's Blade",
         "group": "JungleItems"
      },
      "3801": {
         "id": 3801,
         "plaintext": "Grants Health and Health Regen",
         "description": "<stats>+200 Health<br>+50% Base Health Regen <\/stats>",
         "name": "Crystalline Bracer"
      },
      "3264": {
         "id": 3264,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3707": {
         "id": 3707,
         "description": "<stats>+40 Attack Damage<br>+10% Cooldown Reduction<br>+10 Armor Penetration<\/stats>",
         "name": "Enchantment: Warrior",
         "group": "JungleItems"
      },
      "3265": {
         "id": 3265,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3266": {
         "id": 3266,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3800": {
         "id": 3800,
         "plaintext": "Grants Health, Mana. Activate to speed towards enemies and slow them.",
         "description": "<stats>+600 Health<br><mana>+300 Mana<\/mana><br>+100% Base Health Regen <\/stats><br><br><unique>UNIQUE Passive - Valor's Reward:<\/unique> Upon leveling up, restores 150 Health and 200 Mana over 8 seconds.<br><unique>UNIQUE Active:<\/unique> Grants +60% Movement Speed to nearby allies when moving towards enemies or enemy turrets for 3 seconds. After 3 seconds, a shockwave is emitted, slowing nearby enemy champion Movement Speed by 80% for 1 second(s) (60 second cooldown).<br><br>This effect may be reactivated early to instantly release the shockwave.",
         "name": "Righteous Glory"
      },
      "3504": {
         "id": 3504,
         "plaintext": "Shield and heal effects on other units grant them Attack Speed and bonus on-hit magic damage briefly",
         "description": "<stats>+40 Ability Power<br>+10% Cooldown Reduction<br><mana>+100% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive:<\/unique> +8% Movement Speed<br><unique>UNIQUE Passive:<\/unique> Your heals and shields on another allied champion grant them 15% Attack Speed and 30 magic damage on-hit for 6 seconds.<br><br><i>(This does not include regeneration effects or effects on yourself.)",
         "name": "Ardent Censer"
      },
      "3260": {
         "id": 3260,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3261": {
         "id": 3261,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3708": {
         "id": 3708,
         "description": "<stats>+80 Ability Power<br>+20% Cooldown Reduction<\/stats>",
         "name": "Enchantment: Magus",
         "group": "JungleItems"
      },
      "3262": {
         "id": 3262,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3709": {
         "id": 3709,
         "description": "<stats>+300 Health<br>+25% Bonus Health<\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 15 (+0.6 per champion level) magic damage a second to nearby enemies. Deals 100% bonus damage to monsters. ",
         "name": "Enchantment: Cinderhulk",
         "group": "JungleItems"
      },
      "3508": {
         "id": 3508,
         "plaintext": "Grants Attack Damage and Mana Leech based on missing Mana",
         "description": "<stats>+80 Attack Damage<br>+10% Life Steal<br>+10% Cooldown Reduction<\/stats><br><br><mana><passive>UNIQUE Passive:<\/passive> Restores 2% to 8% of the damage dealt by basic attacks as Mana. This effect increases based on missing Mana.<\/mana>",
         "name": "Essence Reaver"
      },
      "3361": {
         "id": 3361,
         "plaintext": "Periodically place a Stealth Ward",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><levelLimit> *Level 9+ required to upgrade.<\/levelLimit><stats><\/stats><br><br><unique>UNIQUE Active:<\/unique> Consume a charge to place an invisible ward that reveals the surrounding area for 180 seconds.  Stores a charge every 60 seconds, up to 2 total. Limit 3 <font color='#BBFFFF'>Stealth Wards<\/font> on the map per player.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Greater Stealth Totem (Trinket)",
         "group": "RelicBase"
      },
      "3362": {
         "id": 3362,
         "plaintext": "Periodically place a Vision Ward",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><levelLimit> *Level 9+ required to upgrade.<\/levelLimit><stats><\/stats><br><br><unique>UNIQUE Active:<\/unique> Places a visible ward that reveals the surrounding area and invisible units in the area until killed (120 second cooldown). Limit 1 <font color='#BBFFFF'>Vision Ward<\/font> on the map per player.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Greater Vision Totem (Trinket)",
         "group": "RelicBase"
      },
      "3363": {
         "id": 3363,
         "plaintext": "Briefly reveals a targeted area",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><levelLimit> <stats> *Level 9+ required to upgrade.<\/stats><\/levelLimit><br><br><unique>UNIQUE Active:<\/unique> Reveals an area up to 4000 units away for 2 seconds. Enemy champions found will be revealed for 5 seconds (90 second cooldown). <br><br>Also places a visible ward in the area that lasts 60 seconds. This ward is untargetable by allies.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Farsight Orb (Trinket)",
         "group": "RelicBase"
      },
      "3364": {
         "id": 3364,
         "plaintext": "Disables nearby invisible wards and trap and grants true sight briefly",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><levelLimit> *Level 9+ required to upgrade.<\/levelLimit><stats><\/stats><br><br><unique>UNIQUE Active:<\/unique> Reveals and disables nearby invisible traps and invisible wards for 6 seconds in a medium radius and grants detection of nearby invisible units for 10 seconds (75 second cooldown).<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Oracle's Lens (Trinket)",
         "group": "RelicBase"
      },
      "3257": {
         "id": 3257,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3256": {
         "id": 3256,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3259": {
         "id": 3259,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3258": {
         "id": 3258,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "3276": {
         "id": 3276,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "3277": {
         "id": 3277,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3274": {
         "id": 3274,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3275": {
         "id": 3275,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3272": {
         "id": 3272,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "3273": {
         "id": 3273,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "2140": {
         "id": 2140,
         "plaintext": "Temporarily grants Attack Damage and heals you when dealing physical damage.",
         "description": "<stats><levelLimit>Level 9 required to purchase.<\/levelLimit><\/stats><br><br><consumable>Click to Consume:<\/consumable> Grants +25 Attack Damage and <font color='#FF8811'><u>Bloodlust<\/u><\/font> for 3 minutes.<br><br><font color='#FF8811'><u>Bloodlust:<\/u><\/font> Dealing physical damage to champions heals for 10% of the damage dealt. Scoring a Kill or Assist extends the duration of this Flask by 30 seconds.<br><br><i>(Only one Flask effect may be active at a time.)<\/i>",
         "name": "Elixir of Wrath",
         "group": "Flasks"
      },
      "3270": {
         "id": 3270,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Homeguard bonus.<br><br><unique>UNIQUE Passive - Homeguard:<\/unique> Visiting the shop vastly increases Health and Mana Regeneration and grants 200% bonus Movement Speed that decays over 8 seconds. Bonus Movement Speed and regeneration are disabled for 6 seconds upon dealing or taking damage.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Homeguard",
         "group": "BootsHomeguard"
      },
      "3271": {
         "id": 3271,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Captain bonus.<br><br><unique>UNIQUE Passive - Captain:<\/unique> Grants +10% Movement Speed to nearby approaching allied champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Captain",
         "group": "BootsCaptain"
      },
      "2138": {
         "id": 2138,
         "plaintext": "Temporarily reduces the power of enemy crowd control effects. Leaves a trail for allies to follow.",
         "description": "<stats><levelLimit>Level 9 required to purchase.<\/levelLimit><\/stats><br><br><consumable>Click to Consume:<\/consumable> Grants 25% increased Size, Slow Resistance, Tenacity and <font color='#FF8811'><u>Path of Iron<\/u><\/font> for 3 minutes.<br><br><font color='#FF8811'><u>Path of Iron:<\/u><\/font> Moving leaves a path behind that boosts allied champion's Movement Speed by 15%.<br><br><i>(Only one Flask effect may be active at a time.)<\/i>",
         "name": "Elixir of Iron",
         "group": "Flasks"
      },
      "2139": {
         "id": 2139,
         "plaintext": "Temporarily grants Ability Power and Bonus Damage to champions and turrets.",
         "description": "<stats><levelLimit>Level 9 required to purchase.<\/levelLimit><\/stats><br><br><consumable>Click to Consume:<\/consumable> Grants +40 Ability Power, 15 bonus Mana Regen per 5 seconds and <font color='#FF8811'><u>Sorcery<\/u><\/font> for 3 minutes. <br><br><font color='#FF8811'><u>Sorcery:<\/u><\/font> Damaging a champion or turret deals 25 bonus True Damage. This effect has a 5 second cooldown versus champions but no cooldown versus turrets.<br><br><i>(Only one Flask effect may be active at a time.)<\/i><br>",
         "name": "Elixir of Sorcery",
         "group": "Flasks"
      },
      "3269": {
         "id": 3269,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Alacrity bonus. <br><br><unique>UNIQUE Passive - Alacrity:<\/unique> +20 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Alacrity",
         "group": "BootsAlacrity"
      },
      "3268": {
         "id": 3268,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Distortion bonus.<br><br><unique>UNIQUE Passive - Distortion:<\/unique> Teleport, Flash, and Ghost summoner spell cooldowns are reduced by 20% and are granted additional mobility: <br><br><font color='#FFDD00'>Ghost:<\/font> Grants 40% Movement Speed from 27%.<br><font color='#FFDD00'>Flash:<\/font> 20% Movement Speed bonus for 1 second after cast.<br><font color='#FFDD00'>Teleport:<\/font> 30% Movement Speed bonus for 3 seconds after use.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Distortion",
         "group": "BootsDistortion"
      },
      "2137": {
         "id": 2137,
         "plaintext": "Temporarily grants Health and boosts the speed and power of nearby minions versus Towers.",
         "description": "<stats><levelLimit>Level 9 required to purchase.<\/levelLimit><\/stats><br><br><consumable>Click to Consume:<\/consumable> Grants +250 Health, 15% Bonus Damage to Towers and <font color='#FF8811'><u>Siege Commander<\/u><\/font> for 3 minutes.<br><br><font color='#FF8811'><u>Siege Commander:<\/u><\/font> Nearby minions gain 15% Bonus Damage to Towers and gain Movement Speed based on champion's Movement Speed.<br><br><i>(Only one Flask effect may be active at a time.)<\/i>",
         "name": "Elixir of Ruin",
         "group": "Flasks"
      },
      "3267": {
         "id": 3267,
         "description": "<groupLimit>Limited to 1 of each enchantment type.<\/groupLimit><br>Enchants boots to have Furor bonus.<br><br><unique>UNIQUE Passive - Furor:<\/unique> Upon dealing damage with a single target spell or attack (on hit), grants +12% Movement Speed that decays over 2 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Enchantment: Furor",
         "group": "BootsFuror"
      },
      "1004": {
         "id": 1004,
         "plaintext": "Slightly increases Mana Regen",
         "description": "<stats><mana>+25% Base Mana Regen <\/mana><\/stats>",
         "name": "Faerie Charm"
      },
      "1001": {
         "id": 1001,
         "plaintext": "Slightly increases Movement Speed",
         "description": "<groupLimit>Limited to 1.<\/groupLimit><br><br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +25 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Boots of Speed",
         "group": "BootsNormal"
      },
      "3146": {
         "id": 3146,
         "plaintext": "Increases Attack Damage and Ability Power, activate to slow a target",
         "description": "<stats>+40 Attack Damage<br>+80 Ability Power<br>+10% Life Steal<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +20% Spell Vamp<br><unique>UNIQUE Passive:<\/unique> Basic attacks (on hit) and single-target spells against champions reduce the cooldown of this item by 3 seconds.<br><active>UNIQUE Active:<\/active> Deals 150 (+40% of Ability Power) magic damage and slows the target champion's Movement Speed by 40% for 2 seconds (60 second cooldown).<br><br><i>(Spell Vamp: Abilities heal for a percentage of the damage they deal. Area of Effect spells only grant one-third of the healing from Spell Vamp.)<\/i>",
         "name": "Hextech Gunblade"
      },
      "1006": {
         "id": 1006,
         "plaintext": "Slightly increases Health Regen",
         "description": "<stats>+50% Base Health Regen <\/stats>",
         "name": "Rejuvenation Bead"
      },
      "3006": {
         "id": 3006,
         "plaintext": "Enhances Movement Speed and Attack Speed",
         "description": "<stats> +25% Attack Speed<\/stats><br><br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +45 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Berserker's Greaves"
      },
      "3003": {
         "id": 3003,
         "plaintext": "Increases Ability Power based on maximum Mana",
         "description": "<stats>+60 Ability Power<br><mana>+250 Mana<br>+50% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Insight:<\/unique> Grants Ability Power equal to 3% of maximum Mana.<br><unique>UNIQUE Passive - Mana Charge:<\/unique> Grants +8 maximum Mana (max +750 Mana) for each spell cast and Mana expenditure (occurs up to 2 times every 8 seconds). Transforms into Seraph's Embrace at +750 Mana.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Archangel's Staff"
      },
      "3004": {
         "id": 3004,
         "plaintext": "Increases Attack Damage based on maximum Mana",
         "description": "<stats>+25 Attack Damage<br><mana>+250 Mana<br>+25% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Awe:<\/unique> Grants bonus Attack Damage equal to 2% of maximum Mana.<br><unique>UNIQUE Passive - Mana Charge:<\/unique> Grants +4 maximum Mana (max +750 Mana) for each basic attack, spell cast, and Mana expenditure (occurs up to 2 times every 8 seconds).<br><br>Transforms into Muramana at +750 Mana.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Manamune"
      },
      "3009": {
         "id": 3009,
         "plaintext": "Enhances Movement Speed and reduces the effect of slows",
         "description": "<unique>UNIQUE Passive - Enhanced Movement:<\/unique> +60 Movement Speed<br><unique>UNIQUE Passive - Slow Resist:<\/unique> Movement slowing effects are reduced by 25%.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Boots of Swiftness"
      },
      "3007": {
         "id": 3007,
         "plaintext": "Increases Ability Power based on maximum Mana",
         "description": "<stats>+60 Ability Power<br><mana>+250 Mana<br>+50% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Insight:<\/unique> Grants Ability Power equal to 3% of maximum Mana.<br><unique>UNIQUE Passive - Mana Charge:<\/unique> Grants +10 maximum Mana (max +750 Mana) for each spell cast and Mana expenditure (occurs up to 2 times every 6 seconds). Transforms into Seraph's Embrace at +750 Mana.<br><\/mana><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Archangel's Staff (Crystal Scar)"
      },
      "3008": {
         "id": 3008,
         "plaintext": "Increases Attack Damage based on maximum Mana",
         "description": "<stats>+25 Attack Damage<br><mana>+250 Mana<br>+25% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Awe:<\/unique> Grants bonus Attack Damage equal to 2% of maximum Mana.<br><unique>UNIQUE Passive - Mana Charge:<\/unique> Grants +8 maximum Mana (max +750 Mana) for each basic attack, spell cast, and Mana expenditure (occurs up to 2 times every 6 seconds).<br><br>Transforms into Muramana at +750 Mana.<br><\/mana><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Manamune (Crystal Scar)"
      },
      "3342": {
         "id": 3342,
         "plaintext": "Briefly reveals a nearby targeted area",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><br><br><unique>Active:<\/unique> Reveals a small location within 2500 range for 2 seconds. Enemy champions found will be revealed for 5 seconds (120 second cooldown).<br><br>At level 9, cast range increases to 3500.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Scrying Orb (Trinket)",
         "group": "RelicBase"
      },
      "3341": {
         "id": 3341,
         "plaintext": "Detects and disables nearby invisible wards and traps",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><br><br><unique>Active:<\/unique> Reveals and disables nearby invisible traps and invisible wards for 6 seconds in a small radius (120 second cooldown).<br><br>At level 9, cast range and sweep radius increase by 50% each and the cooldown is reduced to 75 seconds.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Sweeping Lens (Trinket)",
         "group": "RelicBase"
      },
      "3340": {
         "id": 3340,
         "plaintext": "Periodically place a Stealth Ward",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><br><br><unique>Active:<\/unique> Places a <font color='#BBFFFF'>Stealth Ward<\/font> that lasts 60 seconds (120 second cooldown).<br><br>At level 9, this ward's duration increases to 120 seconds.<br><br>Limit 3 <font color='#BBFFFF'>Stealth Wards<\/font> on the map per player.<br><br><i>(Trinkets cannot be used in the first 30 seconds of a game. Selling a Trinket will disable Trinket use for 120 seconds).<\/i>",
         "name": "Warding Totem (Trinket)",
         "group": "RelicBase"
      },
      "3010": {
         "id": 3010,
         "plaintext": "Restores Health and Mana upon leveling up",
         "description": "<stats>+200 Health<br><mana>+300 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive - Valor's Reward:<\/unique> Upon leveling up, restores 150 Health and 200 Mana over 8 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Catalyst the Protector"
      },
      "3156": {
         "id": 3156,
         "plaintext": "Grants bonus Attack Damage when Health is low",
         "description": "<stats>+60 Attack Damage<br>+40 Magic Resist<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants +1 Attack Damage for every 2% of missing Health, up to a maximum of 35 Attack Damage.<br><unique>UNIQUE Passive - Lifeline:<\/unique> Upon taking magic damage that would reduce Health below 30%, grants a shield that absorbs 400 magic damage for 5 seconds (90 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Maw of Malmortius"
      },
      "3155": {
         "id": 3155,
         "plaintext": "Increases Attack Damage and Magic Resist",
         "description": "<stats>+25 Attack Damage<br>+30 Magic Resist<\/stats><br><br><unique>UNIQUE Passive - Lifeline:<\/unique> Upon taking magic damage that would reduce Health below 30%, grants a shield that absorbs 250 magic damage for 5 seconds (90 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Hexdrinker"
      },
      "3154": {
         "id": 3154,
         "plaintext": "Kills monsters quickly and gain more gold, activate to place a ward",
         "description": "<stats>+12 Attack Damage<br>+30% Attack Speed<\/stats><br><br><unique>UNIQUE Passive - Maim:<\/unique> Basic attacks against monsters deal 75 bonus magic damage and heal 10 Health on hit.<br><unique>UNIQUE Passive:<\/unique> Gain 30% increased Gold from monsters.<br><active>UNIQUE Active:<\/active> Places a <font color='#BBFFFF'>Stealth Ward<\/font> that reveals the surrounding area for 180 seconds (180 second cooldown).<br><br>Transforms into Feral Flare at 30 kills, assists and large monster kills.<br><i>(Champions and monsters killed with Hunter's Machete and Madred's Razors count toward this transformation)<\/i><br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Wriggle's Lantern",
         "group": "GoldBase"
      },
      "3153": {
         "id": 3153,
         "plaintext": "Deals damage based on target's Health, can steal Health and Movement Speed",
         "description": "<stats>+25 Attack Damage<br>+40% Attack Speed<br>+10% Life Steal<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Basic attacks deal 8% of the target's current Health in bonus physical damage (max 60 vs. monsters and minions) on hit.<br><active>UNIQUE Active:<\/active> Deals 10% of target champion's maximum Health (min. 100) as physical damage, heals for the same amount, and steals 25% of the target's Movement Speed for 3 seconds (90 second cooldown).",
         "name": "Blade of the Ruined King"
      },
      "1011": {
         "id": 1011,
         "plaintext": "Greatly increases Health",
         "description": "<stats>+380 Health<\/stats>",
         "name": "Giant's Belt"
      },
      "3152": {
         "id": 3152,
         "plaintext": "Grants Spell Vamp and Ability Power",
         "description": "<stats>+80 Ability Power<br>+10% Cooldown Reduction<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +20% Spell Vamp<br><br><i>(Spell Vamp: Abilities heal for a percentage of the damage they deal. Area of Effect spells only grant one-third of the healing from Spell Vamp.)<\/i>",
         "name": "Will of the Ancients"
      },
      "3200": {
         "id": 3200,
         "plaintext": "Increases Ability Power and can be upgraded to improve Viktor's abilities",
         "description": "<stats>+3 Ability Power per level<\/stats><br><br><passive>UNIQUE Passive - Progress:<\/passive> This item can be upgraded three times to enhance Viktor's basic abilities.",
         "name": "Prototype Hex Core"
      },
      "3151": {
         "id": 3151,
         "plaintext": "Spell damage burns enemies for a portion of their Health",
         "description": "<stats>+50 Ability Power<br>+300 Health<\/stats><br><br><unique>UNIQUE Passive - Eyes of Pain:<\/unique> +15 Magic Penetration<br><unique>UNIQUE Passive:<\/unique> Dealing spell damage applies a damage-over-time effect for 3 seconds that deals bonus magic damage equal to 2% of the target's current Health per second. This bonus damage is doubled against movement-impaired units and capped at 100 damage per second vs. monsters.<br><br><i>(A unit is movement-impaired if it is slowed, stunned, taunted, feared, or immobilized.)<\/i><br><br><i>(Magic Penetration: Magic damage is increased by ignoring an amount of the target's Magic Resist equal to Magic Penetration.)<\/i><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Liandry's Torment"
      },
      "3139": {
         "id": 3139,
         "plaintext": "Activate to remove all debuffs and grant massive Movement Speed",
         "description": "<stats>+80 Attack Damage<br>+35 Magic Resist<\/stats><br><br><active>UNIQUE Active - Quicksilver:<\/active> Removes all debuffs and also grants +50% bonus Movement Speed for 1 second (90 second cooldown).",
         "name": "Mercurial Scimitar"
      },
      "3135": {
         "id": 3135,
         "plaintext": "Increases magic damage",
         "description": "<stats>+70 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Magic damage ignores 35% of the target's Magic Resist (applies before Magic Penetration).",
         "name": "Void Staff"
      },
      "3136": {
         "id": 3136,
         "plaintext": "Increases magic damage",
         "description": "<stats>+25 Ability Power<br>+200 Health<\/stats><br><br><unique>UNIQUE Passive - Eyes of Pain:<\/unique> +15 Magic Penetration<br><br><i>(Magic Penetration: Magic damage is increased by ignoring an amount of the target's Magic Resist equal to Magic Penetration.)<\/i><br><br><i>(Unique Passives with the same name do not stack.)<\/i>",
         "name": "Haunting Guise"
      },
      "3137": {
         "id": 3137,
         "plaintext": "Activate to remove all debuffs and grant massive Movement Speed",
         "description": "<stats>+50% Attack Speed<br>+45 Magic Resist<br>+10% Cooldown Reduction<\/stats><br><br><active>UNIQUE Active - Quicksilver:<\/active> Removes all debuffs, and if champion is melee, also grants +50% bonus Movement Speed for 1 second (90 second cooldown).",
         "name": "Dervish Blade"
      },
      "3348": {
         "id": 3348,
         "plaintext": "Activate to reveal a nearby area of the map",
         "description": "<active>UNIQUE Active - Hunter's Sight:<\/active> A stealth-detecting mist grants vision in the target area for 5 seconds, revealing traps and enemy champions that enter for 3 seconds (60 second cooldown).",
         "name": "Hextech Sweeper",
         "group": "RelicBase"
      },
      "3345": {
         "id": 3345,
         "plaintext": "Consumes charge to revive champion.",
         "description": "<groupLimit>Limited to 1 Trinket.<\/groupLimit><br><br><unique>Active:<\/unique> Consumes a charge to instantly revive at your Summoner Platform and grants 125% Movement Speed that decays over 12 seconds.<br><br><i>Additional charges are gained at levels 9 and 14.<\/i><br><br><font color='#BBFFFF'>(Max: 2 charges)<\/font><\/i><br><br>",
         "name": "Soul Anchor (Trinket)",
         "group": "RelicBase"
      },
      "3001": {
         "id": 3001,
         "plaintext": "Reduces Magic Resist of nearby enemies",
         "description": "<stats>+70 Ability Power<br>+50 Magic Resist<\/stats><br><br><aura>UNIQUE Aura:<\/aura> Reduces the Magic Resist of nearby enemies by 20.",
         "name": "Abyssal Scepter"
      },
      "3143": {
         "id": 3143,
         "plaintext": "Greatly increases defenses, activate to slow nearby enemies",
         "description": "<stats>+500 Health<br>+70 Armor<\/stats><br><br><unique>UNIQUE Passive - Cold Steel:<\/unique> When hit by basic attacks, reduces the attacker's Attack Speed by 15%.<br><active>UNIQUE Active:<\/active> Slows the Movement Speed of nearby enemy units by 35% for 2 seconds (+1 second per 200 Armor and +1 second per 200 Magic Resist) (60 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Randuin's Omen"
      },
      "3142": {
         "id": 3142,
         "plaintext": "Activate to greatly increase Movement Speed and Attack Speed",
         "description": "<stats>+30 Attack Damage<br>+15% Critical Strike Chance<br>+10% Cooldown Reduction<\/stats><br><br><passive>UNIQUE Passive:<\/passive> +20 Armor Penetration<\/passive><br><active>UNIQUE Active:<\/active> Grants +20% Movement Speed and +40% Attack Speed for 6 seconds (45 second cooldown).<br><br><i>(Armor Penetration: Physical damage is increased by ignoring an amount of the target's Armor equal to Armor Penetration.)<\/i>",
         "name": "Youmuu's Ghostblade"
      },
      "3145": {
         "id": 3145,
         "plaintext": "Increases Spell Vamp and Ability Power",
         "description": "<stats>+40 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +12% Spell Vamp<br><br><i>(Spell Vamp: Abilities heal for a percentage of the damage they deal. Area of Effect spells only grant one-third of the healing from Spell Vamp.)<\/i>",
         "name": "Hextech Revolver"
      },
      "3401": {
         "id": 3401,
         "plaintext": "Shield an ally from damage based on your Health",
         "description": "<stats>+500 Health<br>+100% Base Health Regen <br>+10% Cooldown Reduction<\/stats><br><br><unique>UNIQUE Passive - Spoils of War:<\/unique> Melee basic attacks execute minions below 400 Health. Killing a minion heals the owner and the nearest allied champion for 50 (+1% of your maximum Health) and grants them kill Gold.<br><br>These effects require a nearby allied champion. Recharges every 30 seconds. Max 4 charges.<br><unique>UNIQUE Active:<\/unique> Shield target ally for 10% of your maximum Health for 4 seconds. After 4 seconds, the target explodes dealing 100% of their total Attack Damage plus 30% of their Ability Power as magic damage in an area (60 second cooldown).<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Face of the Mountain",
         "group": "GoldBase"
      },
      "3144": {
         "id": 3144,
         "plaintext": "Activate to deal magic damage and slow target champion",
         "description": "<stats>+25 Attack Damage<br>+8% Life Steal<\/stats><br><br><active>UNIQUE Active:<\/active> Deals 100 magic damage and slows the target champion's Movement Speed by 25% for 2 seconds (90 second cooldown).",
         "name": "Bilgewater Cutlass"
      },
      "3141": {
         "id": 3141,
         "plaintext": "Grants Attack Damage for kills and assists",
         "description": "<stats>+10 Attack Damage <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants +5 Attack Damage per stack and 5 stacks upon first purchase. Grants 2 stacks for a kill or 1 stack for an assist (max 20 stacks). Half of the stacks are lost upon death. At 20 stacks, grants +20% bonus Attack Speed.",
         "name": "Sword of the Occult"
      },
      "3211": {
         "id": 3211,
         "plaintext": "Improves defense and grants regeneration upon being damage",
         "description": "<stats>+200 Health<br>+35 Magic Resist<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants 150% Base Health Regen for up to 10 seconds after taking damage from an enemy champion.<br><br>",
         "name": "Spectre's Cowl"
      },
      "3140": {
         "id": 3140,
         "plaintext": "Activate to remove all debuffs",
         "description": "<stats>+30 Magic Resist<\/stats><br><br><active>UNIQUE Active - Quicksilver:<\/active> Removes all debuffs (90 second cooldown).",
         "name": "Quicksilver Sash"
      },
      "3124": {
         "id": 3124,
         "plaintext": "Increases Ability Power and Attack Damage",
         "description": "<stats>+30 Attack Damage<br>+40 Ability Power<\/stats><br><br><passive>Passive:<\/passive> Basic attacks (on attack) and spell casts grant +4% Attack Speed and +4 Ability Power for 8 seconds (stacks up to 8 times).<br><unique>UNIQUE Passive:<\/unique> Falling below 50% Health grants +20% Attack Speed, +10% Life Steal, and +10% Spell Vamp until out of combat (30 second cooldown).",
         "name": "Guinsoo's Rageblade"
      },
      "3029": {
         "id": 3029,
         "plaintext": "Greatly increases Health, Mana, and Ability Power",
         "description": "<stats>+450 Health<br><mana>+450 Mana<\/mana><br>+60 Ability Power<\/stats><br><br><passive>Passive:<\/passive> Grants +20 Health, +20 Mana, and +2 Ability Power per stack (max +200 Health, +200 Mana, and +20 Ability Power). Grants 1 stack per 40 seconds (max 10 stacks).<br><unique>UNIQUE Passive - Valor's Reward:<\/unique> Upon leveling up, restores 150 Health and 200 Mana over 8 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Rod of Ages (Crystal Scar)"
      },
      "3027": {
         "id": 3027,
         "plaintext": "Greatly increases Health, Mana, and Ability Power",
         "description": "<stats>+450 Health<br><mana>+450 Mana<\/mana><br>+60 Ability Power<\/stats><br><br><passive>Passive:<\/passive> Grants +20 Health, +20 Mana, and +2 Ability Power per stack (max +200 Health, +200 Mana, and +20 Ability Power). Grants 1 stack per minute (max 10 stacks).<br><unique>UNIQUE Passive - Valor's Reward:<\/unique> Upon leveling up, restores 150 Health and 200 Mana over 8 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Rod of Ages"
      },
      "3028": {
         "id": 3028,
         "plaintext": "Greatly increases Mana Regen",
         "description": "<stats>+25 Magic Resist<br><mana>+50% Base Mana Regen <\/stats><br><br><unique>UNIQUE Passive - Mana Font:<\/unique> Restores 2% of missing Mana every 5 seconds.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Chalice of Harmony"
      },
      "3025": {
         "id": 3025,
         "plaintext": "Basic attacks create a slow field after spell cast",
         "description": "<stats>+60 Armor<br>+30 Ability Power<br>+10% Cooldown Reduction<br><mana>+500 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive - Spellblade:<\/unique> After using an ability, the next basic attack (on hit) deals bonus physical damage equal to 125% of base Attack Damage to enemies near the target, and creates a field around the target for 2 seconds that slows enemy Movement Speed by 30% (1.5 second cooldown, half-sized field if ranged).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Iceborn Gauntlet"
      },
      "3026": {
         "id": 3026,
         "plaintext": "Periodically revives champion upon death",
         "description": "<stats>+50 Armor<br>+50 Magic Resist<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Upon taking lethal damage, restores 30% of maximum Health and Mana after 4 seconds of stasis (300 second cooldown).",
         "name": "Guardian Angel"
      },
      "3512": {
         "id": 3512,
         "plaintext": "Makes a Voidspawn generating Void Gate to push a lane with.",
         "description": "<stats>+60 Armor<br>+60 Magic Resist<br>+100% Base Health Regen <br><\/stats><br><unique>UNIQUE Passive - Point Runner:<\/unique> Builds up to +30% Movement Speed over 2 seconds while near turrets or Void Gates (including fallen turrets).<br><br><active>UNIQUE Active:<\/active> Spawns a Void Gate at target location for 150 seconds. Every 4 seconds the gate makes a Voidspawn that travels down the nearest lane and decays over time. Voidspawn explodes when attacking structures. Voidspawn ignore champions and void targets (150 second cooldown).<br><br>The first and every fourth Voidspawn gain 100% of Armor and Magic Resist as damage.",
         "name": "Zz'Rot Portal"
      },
      "3035": {
         "id": 3035,
         "plaintext": "Increases physical damage",
         "description": "<stats>+40 Attack Damage<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Physical damage ignores 35% of the target's Armor (applies before Armor Penetration).",
         "name": "Last Whisper"
      },
      "3031": {
         "id": 3031,
         "plaintext": "Massively enhances critical strikes",
         "description": "<stats>+80 Attack Damage<br>+20% Critical Strike Chance<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Critical strikes deal 250% damage instead of 200%.",
         "name": "Infinity Edge"
      },
      "3222": {
         "id": 3222,
         "plaintext": "Activate to heal and remove all disabling effects from an allied champion",
         "description": "<stats>+40 Magic Resist<br>+10% Cooldown Reduction<br><mana>+100% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Mana Font:<\/unique> Restores 2% of missing Mana every 5 seconds.<\/mana><br><active>UNIQUE Active:<\/active> Removes all stuns, roots, taunts, fears, silences, and slows on an allied champion and heals that champion for 150 (+10% of maximum Health) (180 second cooldown).<br><br><i>(Unique Passives with the same name do not stack.)<\/i>",
         "name": "Mikael's Crucible"
      },
      "3134": {
         "id": 3134,
         "plaintext": "Increases physical damage and Cooldown Reduction",
         "description": "<stats>+25 Attack Damage<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction<br><unique>UNIQUE Passive:<\/unique> +10 Armor Penetration<br><br><i>(Armor Penetration: Physical damage is increased by ignoring an amount of the target's Armor equal to Armor Penetration.)<\/i>",
         "name": "The Brutalizer"
      },
      "3113": {
         "id": 3113,
         "plaintext": "Increases Ability Power and Movement Speed",
         "description": "<stats>+30 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +5% Movement Speed",
         "name": "Aether Wisp"
      },
      "3114": {
         "id": 3114,
         "plaintext": "Increases Mana Regeneration and Cooldown Reduction",
         "description": "<stats><mana>+50% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction",
         "name": "Forbidden Idol"
      },
      "3115": {
         "id": 3115,
         "plaintext": "Increases Attack Speed, Ability Power, and Cooldown Reduction",
         "description": "<stats>+50% Attack Speed<br>+60 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> +20% Cooldown Reduction<br><unique>UNIQUE Passive:<\/unique> Basic attacks deal 15 (+15% of Ability Power) bonus magic damage on hit.<br>",
         "name": "Nashor's Tooth"
      },
      "3116": {
         "id": 3116,
         "plaintext": "Abilities slow enemies",
         "description": "<stats>+400 Health<br>+100 Ability Power<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Dealing spell damage slows the target's Movement Speed by 35% for 1.5 seconds (15% for multi-target and damage-over-time spells).",
         "name": "Rylai's Crystal Scepter"
      },
      "3117": {
         "id": 3117,
         "plaintext": "Greatly enhances Movement Speed when out of combat",
         "description": "<unique>UNIQUE Passive - Enhanced Movement:<\/unique> +25 Movement Speed. Increases to +105 Movement Speed when out of combat for 5 seconds.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Boots of Mobility"
      },
      "3022": {
         "id": 3022,
         "plaintext": "Basic attacks slow enemies",
         "description": "<stats>+700 Health<br>+30 Attack Damage<\/stats><br><br><unique>UNIQUE Passive - Icy:<\/unique> Basic attacks slow the target's Movement Speed for 1.5 seconds on hit (40% slow for melee attacks, 30% slow for ranged attacks).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Frozen Mallet"
      },
      "3024": {
         "id": 3024,
         "plaintext": "Increases Armor and Cooldown Reduction",
         "description": "<stats>+20 Armor<br><mana>+250 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction",
         "name": "Glacial Shroud"
      },
      "3023": {
         "id": 3023,
         "plaintext": "Summon wraiths to slow and reveal enemy champions",
         "description": "<stats>+80 Ability Power<br>+10% Cooldown Reduction<br>+6% Movement Speed<\/stats><br><br><active>UNIQUE Active - Hunt:<\/active> Summons up to 2 invulnerable ghosts that seek out the 2 nearest enemy champions for 6 seconds. If a ghost reaches its target, it reveals the target and reduces their Movement Speed by 40% for 2.5 seconds.<br><br>If a ghost cannot find a target, it tries to return to the caster. Ghosts that successfully return in this way reduce the item's cooldown by 40 seconds (120 second cooldown).",
         "name": "Twin Shadows"
      },
      "3020": {
         "id": 3020,
         "plaintext": "Enhances Movement Speed and magic damage",
         "description": "<stats>+15 Magic Penetration<\/stats><br><br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +45 Movement Speed<br><br><i>(Magic Penetration: Magic damage is increased by ignoring an amount of the target's Magic Resist equal to Magic Penetration.)<\/i><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Sorcerer's Shoes"
      },
      "3122": {
         "id": 3122,
         "plaintext": "Critical Strikes cause your target to bleed",
         "description": "<stats>+20 Attack Damage<br>+10% Critical Strike Chance<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Critical Strikes cause your target to bleed for an additional 60% of your bonus Attack Damage as magic damage over 3 seconds.<\/i>",
         "name": "Wicked Hatchet"
      },
      "2053": {
         "id": 2053,
         "plaintext": "Enhances Movement Speed near turrets",
         "description": "<stats>+40 Armor<br>+100% Base Health Regen <\/stats><br><br><unique>UNIQUE Passive - Point Runner:<\/unique> Builds up to +30% Movement Speed over 2 seconds while near turrets (including fallen turrets).",
         "name": "Raptor Cloak"
      },
      "2054": {
         "id": 2054,
         "description": "All the flavor of regular Poro-Snax, without the calories! Keeps your Poro happy AND healthy.<br><br><consumable>Click to Consume:<\/consumable> Gives your Poros a delicious healthy treat.",
         "name": "Diet Poro-Snax",
         "group": "RelicBase"
      },
      "3048": {
         "id": 3048,
         "description": "<stats>+60 Ability Power<br><mana>+1000 Mana<br>+50% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Insight:<\/unique> Grants Ability Power equal to 3% of maximum Mana.<\/mana><br><active>UNIQUE Active - Mana Shield:<\/active> Consumes 20% of current Mana to grant a shield for 3 seconds that absorbs damage equal to 150 plus the amount of Mana consumed (120 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Seraph's Embrace"
      },
      "3047": {
         "id": 3047,
         "plaintext": "Enhances Movement Speed and reduces incoming basic attack damage",
         "description": "<stats>+25 Armor<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Blocks 10% of the damage from basic attacks.<br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +45 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Ninja Tabi"
      },
      "2050": {
         "id": 2050,
         "description": "<consumable>Click to Consume:<\/consumable> Places an invisible ward that reveals the surrounding area for 60 seconds.",
         "name": "Explorer's Ward"
      },
      "2051": {
         "id": 2051,
         "plaintext": "Activate for Movement Speed and a defensive boost",
         "description": "<stats>+200 Health<br>+125% Base Health Regeneration <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Enemy spellcasts reduce the cooldown of Battle Cry by 1 second.<br><active>UNIQUE Active - Battle Cry:<\/active> Gain 30% Movement Speed, 20 Armor, and 20 Magic Resist for 3 seconds. 25 second cooldown.",
         "name": "Guardian's Horn"
      },
      "2052": {
         "id": 2052,
         "description": "This savory blend of free-range, grass-fed Avarosan game hens and organic, non-ZMO Freljordian herbs contains the essential nutrients necessary to keep your Poro purring with pleasure.<br><br><i>All proceeds will be donated towards fighting Noxian animal cruelty.<\/i>",
         "name": "Poro-Snax",
         "group": "RelicBase"
      },
      "1051": {
         "id": 1051,
         "plaintext": "Slightly increases Critical Strike Chance",
         "description": "<stats>+8% Critical Strike Chance<\/stats>",
         "name": "Brawler's Gloves"
      },
      "3197": {
         "id": 3197,
         "plaintext": "Allows Viktor to improve an ability of his choice",
         "description": "<stats>+5 Ability Power per level<br>+40 Ability Power<br>+300 Mana<\/stats><br><br><passive>UNIQUE Passive - Progress:<\/passive> Viktor can upgrade one of his basic spells.",
         "name": "The Hex Core mk-2"
      },
      "3198": {
         "id": 3198,
         "plaintext": "Allows Viktor to improve an ability of his choice",
         "description": "<stats>+6 Ability Power per level<br>+60 Ability Power<br>+500 Mana<\/stats><br><br><passive>UNIQUE Passive - Glorious Evolution:<\/passive> Viktor has reached the pinnacle of his power, upgrading Chaos Storm in addition to his basic spells.",
         "name": "Perfect Hex Core"
      },
      "1054": {
         "id": 1054,
         "plaintext": "Good defensive starting item",
         "description": "<stats>+80 Health<\/stats><br><br><unique>Passive: <\/unique> Restores 6 Health every 5 seconds.<br><unique>UNIQUE Passive:<\/unique> Blocks 8 damage from single target attacks and spells from champions.",
         "name": "Doran's Shield"
      },
      "1055": {
         "id": 1055,
         "plaintext": "Good starting item for attackers",
         "description": "<stats>+70 Health<br>+7 Attack Damage<br>+3% Life Steal<\/stats>",
         "name": "Doran's Blade"
      },
      "3196": {
         "id": 3196,
         "plaintext": "Allows Viktor to improve an ability of his choice",
         "description": "<stats>+4 Ability Power per level<br>+20 Ability Power<br>+150 Mana<\/stats><br><br><passive>UNIQUE Passive - Progress:<\/passive> Viktor can upgrade one of his basic spells.",
         "name": "The Hex Core mk-1"
      },
      "1052": {
         "id": 1052,
         "plaintext": "Slightly increases Ability Power",
         "description": "<stats>+20 Ability Power<\/stats>",
         "name": "Amplifying Tome"
      },
      "1053": {
         "id": 1053,
         "plaintext": "Basic attacks restore Health",
         "description": "<stats>+10 Attack Damage<br>+8% Life Steal<\/stats>",
         "name": "Vampiric Scepter"
      },
      "3191": {
         "id": 3191,
         "plaintext": "Increases Armor and Ability Power",
         "description": "<stats>+30 Armor<br>+25 Ability Power<\/stats><br><br><passive>UNIQUE Passive:<\/passive> Killing a unit grants 0.5 bonus Armor and Ability Power. This bonus stacks up to 30 times.",
         "name": "Seeker's Armguard"
      },
      "3050": {
         "id": 3050,
         "plaintext": "Grants nearby allies Life Steal and Attack Damage",
         "description": "<stats>+250 Health<br>+20% Cooldown Reduction<\/stats><br><br><aura>UNIQUE Aura:<\/aura> Grants allied champions +10% Life Steal and +20 Attack Damage.",
         "name": "Zeke's Herald"
      },
      "3190": {
         "id": 3190,
         "plaintext": "Activate to shield nearby allies from damage",
         "description": "<stats>+400 Health<br>+20 Magic Resist<br>+10% Cooldown Reduction<\/stats><br><br><active>UNIQUE Active:<\/active> Grants a shield to nearby allies for 5 seconds that absorbs up to 50 (+10 per level) damage (60 second cooldown).<br><aura>UNIQUE Aura - Legion:<\/aura> Grants nearby allies +20 Magic Resist and +75% Base Health Regen.<br><br><i>(Unique Auras with the same name don't stack.)",
         "name": "Locket of the Iron Solari"
      },
      "2047": {
         "id": 2047,
         "plaintext": "Allows champion to see invisible units",
         "description": "<consumable>Click to Consume:<\/consumable> Grants detection of nearby invisible units for up to 5 minutes or until death.",
         "name": "Oracle's Extract"
      },
      "3056": {
         "id": 3056,
         "plaintext": "Temporarily disables enemy turrets",
         "description": "<stats>+300 Health<br>+50 Armor<br>+100% Base Health Regen <br>+10% Cooldown Reduction<\/stats><br><br><active>UNIQUE Active:<\/active> Prevents nearby enemy turrets from attacking for 3 seconds (120 second cooldown). This effect cannot be used against the same turret more than once every 8 seconds.<br><br><unique>UNIQUE Passive - Point Runner:<\/unique> Builds up to +30% Movement Speed over 2 seconds while near turrets (including fallen turrets).<br>",
         "name": "Ohmwrecker"
      },
      "3057": {
         "id": 3057,
         "plaintext": "Grants a bonus to next attack after spell cast",
         "description": "<stats>+25 Ability Power<br><mana>+200 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive - Spellblade:<\/unique> After using an ability, the next basic attack deals bonus physical damage equal to 100% base Attack Damage on hit (1.5 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Sheen"
      },
      "2049": {
         "id": 2049,
         "plaintext": "Increases Health and provides Stealth Wards over time",
         "description": "<stats>+150 Health<\/stats><br><br><unique>UNIQUE Passive - Ward Refresh:<\/unique> Holds 4 charges and refills upon visiting the shop.<br><active>UNIQUE Active - Ghost Ward:<\/active> Consumes a charge to place a <font color='#BBFFFF'>Stealth Ward<\/font> that reveals the surrounding area for 3 minutes. A player may only have 3 <font color='#BBFFFF'>Stealth Wards<\/font> on the map at one time.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Sightstone"
      },
      "3301": {
         "id": 3301,
         "plaintext": "Grants gold when nearby minions die that you didn't kill",
         "description": "<stats><mana>+25% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive - Favor:<\/unique> Being near a minion death without dealing the killing blow grants 3 Gold and 5 Health.<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit><br><br><i><font color='#447777'>''Gold dust rises from the desert and clings to the coin.'' - Historian Shurelya, 11 November, 23 CLE<\/font><\/i><br><br>",
         "name": "Ancient Coin",
         "group": "GoldBase"
      },
      "3303": {
         "id": 3303,
         "plaintext": "Grants gold when you attack enemies",
         "description": "<stats>+5 Ability Power<br>+2 Gold per 10 seconds<br><mana>+25% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive - Tribute:<\/unique> Spells and basic attacks against champions or buildings deal 10 additional damage and grant 5 Gold. This can occur up to three times every 30 seconds. Killing a minion disables this passive for 12 seconds.<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Spellthief's Edge",
         "group": "GoldBase"
      },
      "3302": {
         "id": 3302,
         "plaintext": "Kill minions periodically to heal and grant gold to a nearby ally",
         "description": "<stats>+75 Health<\/stats><br><br><unique>UNIQUE Passive - Spoils of War:<\/unique> Melee basic attacks execute minions below 200 Health. Killing a minion heals the owner and the nearest allied champion for 40 Health and grants them kill Gold.<br><br>These effects require a nearby allied champion. Recharges every 60 seconds. Max 2 charges. <br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit>",
         "name": "Relic Shield",
         "group": "GoldBase"
      },
      "1037": {
         "id": 1037,
         "plaintext": "Moderately increases Attack Damage",
         "description": "<stats>+25 Attack Damage<\/stats>",
         "name": "Pickaxe"
      },
      "1036": {
         "id": 1036,
         "plaintext": "Slightly increases Attack Damage",
         "description": "<stats>+10 Attack Damage<\/stats>",
         "name": "Long Sword"
      },
      "1039": {
         "id": 1039,
         "plaintext": "Increases combat power against neutral monsters",
         "description": "<stats>+15 Bonus Gold per Large Monster Kill<\/stats><br><passive>Passive - Jungler:<\/passive> Deal 30 magic damage on hit to monsters over 2 seconds and gain 7 Health and 3 Mana per second while in combat with monsters (no regeneration is gained while in combat with cowardly monsters.)<br><br><groupLimit>Limited to 1 Jungle item<\/groupLimit>",
         "name": "Hunter's Machete",
         "group": "JungleItems"
      },
      "1038": {
         "id": 1038,
         "plaintext": "Greatly increases Attack Damage",
         "description": "<stats>+50 Attack Damage<\/stats>",
         "name": "B. F. Sword"
      },
      "3187": {
         "id": 3187,
         "plaintext": "Activate to reveal a nearby area of the map",
         "description": "<stats>+225 Health<br>+250 Mana<br>+25 Armor<br>+20% Cooldown Reduction<\/stats><br><br><unique>UNIQUE Passive - Trap Detection:<\/unique> Nearby stealthed enemy traps are revealed.<br><active>UNIQUE Active - Hunter's Sight:<\/active> A stealth-detecting mist grants vision in the target area for 5 seconds, revealing enemy champions that enter for 3 seconds (60 second cooldown).",
         "name": "Hextech Sweeper"
      },
      "1042": {
         "id": 1042,
         "plaintext": "Slightly increases Attack Speed",
         "description": "<stats>+15% Attack Speed<\/stats>",
         "name": "Dagger"
      },
      "3184": {
         "id": 3184,
         "plaintext": "Attacks and kills give a small burst of speed, activate to slow enemies",
         "description": "<stats>+275 Health<br>+55 Attack Damage<\/stats><br><br><unique>UNIQUE Passive - Rage:<\/unique> Basic attacks grant 20 Movement Speed for 2 seconds on hit. Kills grant 60 Movement Speed for 2 seconds. This Movement Speed bonus is halved for ranged champions.<br><active>UNIQUE Active:<\/active> For the next 5 seconds, basic attacks reduce the target's Movement Speed by 30% and deal 80 true damage over 2.5 seconds on hit (60 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Entropy"
      },
      "1043": {
         "id": 1043,
         "plaintext": "Greatly increases Attack Speed",
         "description": "<stats>+30% Attack Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Basic attacks deal an additional 10 physical damage on hit.",
         "name": "Recurve Bow"
      },
      "3185": {
         "id": 3185,
         "plaintext": "Critical Strikes cause your target to bleed and be revealed",
         "description": "<stats>+30 Attack Damage<br>+30% Critical Strike Chance<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Critical Strikes cause enemies to bleed for an additional 90% of bonus Attack Damage as magic damage over 3 seconds and reveal them for the duration.<br><unique>UNIQUE Passive - Trap Detection:<\/unique> Nearby stealthed enemy traps are revealed.<br><active>UNIQUE Active - Hunter's Sight:<\/active> A stealth-detecting mist grants vision in the target area for 5 seconds, revealing enemy champions that enter for 3 seconds (60 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "The Lightbringer"
      },
      "3040": {
         "id": 3040,
         "description": "<stats>+60 Ability Power<br><mana>+1000 Mana<br>+50% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Insight:<\/unique> Grants Ability Power equal to 3% of maximum Mana.<\/mana><br><active>UNIQUE Active - Mana Shield:<\/active> Consumes 20% of current Mana to grant a shield for 3 seconds that absorbs damage equal to 150 plus the amount of Mana consumed (120 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Seraph's Embrace"
      },
      "3180": {
         "id": 3180,
         "plaintext": "Improves defense, activate for area magic damage",
         "description": "<stats>+350 Health<br>+350 Mana<br>+50 Magic Resist<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Reduces and stores 10% of magic damage received. <br><active>UNIQUE Active:<\/active> Deals 200 + (stored magic) (max 400) magic damage to nearby enemy units (90 second cooldown).",
         "name": "Odyn's Veil"
      },
      "3041": {
         "id": 3041,
         "plaintext": "Grants Ability Power for kills and assists",
         "description": "<stats>+20 Ability Power  <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Grants +8 Ability Power per stack and 5 stacks upon first purchase. Grants 2 stacks for a kill or 1 stack for an assist (max 20 stacks). Half of the stacks are lost upon death. At 20 stacks, grants +15% Cooldown Reduction.",
         "name": "Mejai's Soulstealer"
      },
      "3181": {
         "id": 3181,
         "plaintext": "Greatly increases Attack Damage and Life Steal",
         "description": "<stats>+45 Attack Damage<br>+10% Life Steal<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Basic attacks grant +6 Attack Damage and +1% Life Steal for 8 seconds on hit (effect stacks up to 5 times).",
         "name": "Sanguine Blade"
      },
      "3042": {
         "id": 3042,
         "description": "<stats>+25 Attack Damage<br><mana>+1000 Mana<br>+25% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Awe:<\/unique> Grants bonus Attack Damage equal to 2% of maximum Mana.<br><unique>UNIQUE Toggle:<\/unique> Single target spells and attacks (on hit) consume 3% of current Mana to deal bonus physical damage equal to twice the amount of Mana consumed.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Muramana"
      },
      "3043": {
         "id": 3043,
         "description": "<stats>+25 Attack Damage<br><mana>+1000 Mana<br>+25% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Awe:<\/unique> Grants bonus Attack Damage equal to 2% of maximum Mana.<br><unique>UNIQUE Toggle:<\/unique> Single target spells and attacks (on hit) consume 3% of current Mana to deal bonus physical damage equal to twice the amount of Mana consumed.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Muramana"
      },
      "3044": {
         "id": 3044,
         "plaintext": "Attacks and kills give a small burst of speed",
         "description": "<stats>+200 Health<br>+20 Attack Damage<\/stats><br><br><unique>UNIQUE Passive - Rage:<\/unique> Basic attacks grant 20 Movement Speed for 2 seconds. Kills grant 60 Movement Speed instead. This Movement Speed bonus is halved for ranged champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Phage"
      },
      "3046": {
         "id": 3046,
         "plaintext": "Champion attacks faster and can move through units",
         "description": "<stats>+50% Attack Speed<br>+35% Critical Strike Chance<br>+5% Movement Speed<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Champion can move through units.",
         "name": "Phantom Dancer"
      },
      "3069": {
         "id": 3069,
         "plaintext": "Increases Health / Mana Regeneration and Cooldown Reduction. Activate to speed up nearby allies.",
         "description": "<stats>+100% Base Health Regen <br><mana>+100% Base Mana Regen <br><\/mana>+20 Movement Speed<br>+10% Cooldown Reduction<br>+2 Gold per 10 seconds<\/stats><br><br><unique>UNIQUE Passive - Favor:<\/unique> Being near a minion death without dealing the killing blow grants 4 Gold and 10 Health.<br><active>UNIQUE Active:<\/active> Grants nearby allies +40% Movement Speed for 3 seconds (40 second cooldown).<br><br><groupLimit>Limited to 1 Gold Income item<\/groupLimit><br><br><i><font color='#447777'>''Praise the sun.'' - Historian Shurelya, 22 September, 25 CLE<\/font><\/i><br><br>",
         "name": "Talisman of Ascension",
         "group": "GoldBase"
      },
      "1029": {
         "id": 1029,
         "plaintext": "Slightly increases Armor",
         "description": "<stats>+15 Armor<\/stats>",
         "name": "Cloth Armor"
      },
      "1028": {
         "id": 1028,
         "plaintext": "Increases Health",
         "description": "<stats>+150 Health<\/stats>",
         "name": "Ruby Crystal"
      },
      "1027": {
         "id": 1027,
         "plaintext": "Increases Mana",
         "description": "<stats><mana>+200 Mana<\/mana><\/stats>",
         "name": "Sapphire Crystal"
      },
      "1026": {
         "id": 1026,
         "plaintext": "Moderately increases Ability Power",
         "description": "<stats>+40 Ability Power<\/stats>",
         "name": "Blasting Wand"
      },
      "3460": {
         "id": 3460,
         "description": "<unique>Active:<\/unique> Use this trinket to teleport to one of the battle platforms. Can only be used from the summoning platform.<br><br><i><font color='#FDD017'>''It is at this magical precipice where a champion is dismantled, reforged, and empowered.''<\/font><\/i>",
         "name": "Golden Transcendence",
         "group": "RelicBase"
      },
      "3070": {
         "id": 3070,
         "plaintext": "Increases maximum Mana as Mana is spent",
         "description": "<stats><mana>+250 Mana<br>+25% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive - Mana Charge:<\/unique> Grants 4 maximum Mana on spell cast or Mana expenditure (up to 2 times per 8 seconds). Grants 1 maximum Mana every 8 seconds.<br><br>Caps at +750 Mana.<\/mana><br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Tear of the Goddess"
      },
      "3174": {
         "id": 3174,
         "plaintext": "Restores maximum Mana on kill or assist",
         "description": "<stats>+60 Ability Power<br>+25 Magic Resist<br>+20% Cooldown Reduction<br><mana>+100% Base Mana Regen <\/mana><\/stats><br><br><mana><unique>UNIQUE Passive:<\/unique> Restores 30% of maximum Mana on kill or assist.<br><unique>UNIQUE Passive - Mana Font:<\/unique> Restores 2% of missing Mana every 5 seconds.<br><\/mana><br><i>(Unique Passives with the same name do not stack.)<\/i>",
         "name": "Athene's Unholy Grail"
      },
      "3071": {
         "id": 3071,
         "plaintext": "Dealing physical damage to enemy champions reduces their Armor",
         "description": "<stats>+400 Health<br>+40 Attack Damage<br>+20% Cooldown Reduction<\/stats><br><br><passive>UNIQUE Passive:<\/passive> Dealing physical damage to an enemy champion Cleaves them, reducing their Armor by 5% for 6 seconds (stacks up to 6 times, up to 30%).<br><unique>UNIQUE Passive - Rage:<\/unique> Dealing physical damage grants 20 movement speed for 2 seconds. Assists on Cleaved enemy champions or kills on any unit grant 60 movement speed for 2 seconds instead. This Movement Speed is halved for ranged champions.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "The Black Cleaver"
      },
      "1033": {
         "id": 1033,
         "plaintext": "Slightly increases Magic Resist",
         "description": "<stats>+25 Magic Resist<\/stats>",
         "name": "Null-Magic Mantle"
      },
      "3751": {
         "id": 3751,
         "plaintext": "Grants Health and Immolate Aura",
         "description": "<stats>+300 Health  <\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 5 (+1 per champion level) magic damage per second to nearby enemies. Deals 50% bonus damage to minions and monsters.",
         "name": "Bami's Cinder"
      },
      "3172": {
         "id": 3172,
         "plaintext": "Improves offense and reduces duration of disabling effects",
         "description": "<stats>+25 Attack Damage<br>+50% Attack Speed<br>+10% Movement Speed<br>+10% Cooldown Reduction<\/stats><br><br><unique>UNIQUE Passive - Tenacity:<\/unique> Reduces the duration of stuns, slows, taunts, fears, silences, blinds, polymorphs, and immobilizes by 35%.<br><br><i>(Unique Passives with the same name do not stack.)<\/i>",
         "name": "Zephyr"
      },
      "1031": {
         "id": 1031,
         "plaintext": "Greatly increases Armor",
         "description": "<stats>+40 Armor<\/stats>",
         "name": "Chain Vest"
      },
      "3078": {
         "id": 3078,
         "plaintext": "Tons of Damage",
         "description": "<stats>+30 Attack Damage<br>+30 Ability Power<br>+30% Attack Speed<br>+10% Critical Strike Chance<br>+8% Movement Speed<br>+250 Health<br><mana>+200 Mana<\/mana><\/stats><br><br><unique>UNIQUE Passive - Rage:<\/unique> Basic attacks grant 20 Movement Speed for 2 seconds. Kills grant 60 Movement Speed instead. This Movement Speed bonus is halved for ranged champions.<br><unique>UNIQUE Passive - Spellblade:<\/unique> After using an ability, the next basic attack deals bonus physical damage equal to 200% of base Attack Damage on hit (1.5 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Trinity Force"
      },
      "3077": {
         "id": 3077,
         "plaintext": "Melee attacks hit nearby enemies",
         "description": "<stats>+40 Attack Damage<br>+100% Base Health Regen <\/stats><br><br><unique>UNIQUE Passive - Cleave:<\/unique> Basic attacks deal 20% to 60% of total Attack Damage as bonus physical damage to enemies near the target on hit (enemies closest to the target take the most damage).<br><active>UNIQUE Active - Crescent:<\/active> Deals 60% to 100% of total Attack Damage as physical damage to nearby enemy units (enemies closest to the target take the most damage) (10 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Tiamat (Melee Only)"
      },
      "3074": {
         "id": 3074,
         "plaintext": "Melee attacks hit nearby enemies, dealing damage and restoring Health",
         "description": "<stats>+75 Attack Damage<br>+100% Base Health Regen <br>+12% Life Steal<\/stats><br><br><passive>Passive:<\/passive> Life Steal applies to damage dealt by this item.<br><unique>UNIQUE Passive - Cleave:<\/unique> Basic attacks deal 20% to 60% of total Attack Damage as bonus physical damage to enemies near the target on hit (enemies closest to the target take the most damage).<br><active>UNIQUE Active - Crescent:<\/active> Deals 60% to 100% of total Attack Damage as physical damage to nearby enemy units (closest enemies take the most damage) (10 second cooldown).<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Ravenous Hydra (Melee Only)"
      },
      "3170": {
         "id": 3170,
         "plaintext": "Improves defense and reduces duration of disabling effects",
         "description": "<stats>+50 Ability Power<br>+50 Armor<br>+50 Magic Resist<\/stats><br><br><unique>UNIQUE Passive - Tenacity:<\/unique> Reduces the duration of stuns, slows, taunts, fears, silences, blinds, polymorphs, and immobilizes by 35%.<br><br><i>(Unique Passives with the same name do not stack.)<\/i>",
         "name": "Moonflair Spellblade"
      },
      "3075": {
         "id": 3075,
         "plaintext": "Returns damage taken from basic attacks as magic damage",
         "description": "<stats>+100 Armor  <\/stats><br><br><unique>UNIQUE Passive:<\/unique> Upon being hit by a basic attack, returns 30% of the incoming damage (before being reduced by defenses) to the attacker as magic damage.",
         "name": "Thornmail"
      },
      "3072": {
         "id": 3072,
         "plaintext": "Grants Attack Damage, Life Steal and Life Steal now overheals",
         "description": "<stats>+80 Attack Damage<\/stats><br><br><passive>UNIQUE Passive:<\/passive> +20% Life Steal<br><passive>UNIQUE Passive:<\/passive> Your basic attacks can now overheal you. Excess life is stored as a shield that can block 50-350 damage, based on champion level.<br><br>This shield decays slowly if you haven't dealt or taken damage in the last 25 seconds.",
         "name": "The Bloodthirster"
      },
      "3073": {
         "id": 3073,
         "plaintext": "Increases maximum Mana as Mana is spent",
         "description": "<stats><mana>+250 Mana<br>+25% Base Mana Regen <\/stats><br><br><unique>UNIQUE Passive - Mana Charge:<\/unique> +5 maximum Mana on spell cast or Mana expenditure (up to 2 times per 6 seconds); <br>+1 maximum Mana per 6 seconds;<br>Max +750 Mana.<br><br><i>(Unique Passives with the same name don't stack.)<\/i><\/mana>",
         "name": "Tear of the Goddess (Crystal Scar)"
      },
      "2041": {
         "id": 2041,
         "plaintext": "Restores Health and Mana over time, refills at shop",
         "description": "<unique>UNIQUE Passive:<\/unique> Holds 3 charges and refills upon visiting the shop.<br><active>UNIQUE Active:<\/active> Consumes a charge to restore 120 Health and 60 Mana over 12 seconds.",
         "name": "Crystalline Flask"
      },
      "2044": {
         "id": 2044,
         "plaintext": "Use to temporarily provide vision in an area",
         "description": "<groupLimit>Can only carry 3 Stealth Wards in inventory.<\/groupLimit><br><br><consumable>Click to Consume:<\/consumable> Places an invisible ward that reveals the surrounding area for 3 minutes. Limit 3 <font color='#BBFFFF'>Stealth Wards<\/font> on the map per player.",
         "name": "Stealth Ward",
         "group": "GreenWards"
      },
      "2045": {
         "id": 2045,
         "plaintext": "Greatly increases Health and provides Stealth Wards over time",
         "description": "<stats>+400 Health<\/stats><br><br><unique>UNIQUE Passive - Ward Refresh:<\/unique> Holds 5 charges and refills upon visiting the shop.<br><active>UNIQUE Active - Ghost Ward:<\/active> Consumes a charge to place a <font color='#BBFFFF'>Stealth Ward<\/font> that reveals the surrounding area for 3 minutes. A player may only have 3 <font color='#BBFFFF'>Stealth Wards<\/font> on the map at one time.<br><br><i>(Unique Passives with the same name don't stack.)<\/i>",
         "name": "Ruby Sightstone"
      },
      "2043": {
         "id": 2043,
         "plaintext": "Use to temporarily provide vision and stealth detection in an area",
         "description": "<groupLimit>Can only carry 2 Vision Wards in inventory.<\/groupLimit><br><br><consumable>Click to Consume:<\/consumable> Places a visible ward that reveals the surrounding area and invisible units in the area until killed. Limit 1 <font color='#BBFFFF'>Vision Ward<\/font> on the map per player.<br><br><i>(Revealing a ward in this manner grants a portion of the gold reward when that unit is killed.)<\/i>",
         "name": "Vision Ward",
         "group": "PinkWards"
      },
      "3158": {
         "id": 3158,
         "plaintext": "Increases Movement Speed and Cooldown Reduction",
         "description": "<unique>UNIQUE Passive:<\/unique> +15% Cooldown Reduction<br><unique>UNIQUE Passive - Enhanced Movement:<\/unique> +45 Movement Speed<br><br><i>(Unique Passives with the same name don't stack.)<\/i><br><br><i><font color='#FDD017'>''This item is dedicated in honor of Ionia's victory over Noxus in the Rematch for the Southern Provinces on 10 December, 20 CLE.''<\/font><\/i>",
         "name": "Ionian Boots of Lucidity"
      },
      "3157": {
         "id": 3157,
         "plaintext": "Activate to become invincible but unable to take actions",
         "description": "<stats>+120 Ability Power<br>+50 Armor  <\/stats><br><br><active>UNIQUE Active - Stasis:<\/active> Champion becomes invulnerable and untargetable for 2.5 seconds, but is unable to move, attack, cast spells, or use items during this time (90 second cooldown).",
         "name": "Zhonya's Hourglass"
      },
      "3159": {
         "id": 3159,
         "plaintext": "Kills monsters quickly and gain more gold, activate to reveal a nearby area of the map",
         "description": "<stats>+15 Attack Damage<br>+30% Attack Speed<\/stats><br><br><unique>UNIQUE Passive - Maim:<\/unique> Basic attacks against monsters deal 75 bonus magic damage and heal 10 Health on hit.<br><unique>UNIQUE Passive:<\/unique> Gain 30% increased Gold from monsters.<br><unique>UNIQUE Passive - Trap Detection:<\/unique> Nearby stealthed enemy traps are revealed.<br><active>UNIQUE Active - Hunter's Sight:<\/active> A stealth-detecting mist grants vision in the target area for 5 seconds, revealing enemy champions that enter for 3 seconds (60 second cooldown).",
         "name": "Grez's Spectral Lantern",
         "group": "GoldBase"
      },
      "1018": {
         "id": 1018,
         "plaintext": "Moderately increases Critical Strike Chance",
         "description": "<stats>+15% Critical Strike Chance<\/stats>",
         "name": "Cloak of Agility"
      },
      "3060": {
         "id": 3060,
         "plaintext": "Promotes a siege minion to a more powerful unit",
         "description": "<stats>+200 Health<br>+60 Ability Power<br>+20 Magic Resist<br>+10% Cooldown Reduction<\/stats><br><br><aura>UNIQUE Aura - Legion:<\/aura> Grants nearby allies +20 Magic Resist and +75% Base Health Regen.<br><active>UNIQUE Active - Promote:<\/active> Greatly increases the power of a lane minion and grants it immunity to magic damage (120 second cooldown).<br><br><i>(Unique Auras with the same name do not stack.)<\/i>",
         "name": "Banner of Command"
      },
      "3165": {
         "id": 3165,
         "plaintext": "Greatly increases Ability Power and Cooldown Reduction",
         "description": "<stats>+80 Ability Power<br>+20% Cooldown Reduction<br><mana>+100% Base Mana Regen <\/mana><\/stats><br><br><unique>UNIQUE Passive:<\/unique> Dealing magic damage to enemy champions below 40% Health inflicts Grievous Wounds for 4 seconds.<br><br><i>(Grievous Wounds reduces incoming healing and regeneration effects by 50%.)<\/i>",
         "name": "Morellonomicon"
      },
      "3065": {
         "id": 3065,
         "plaintext": "Increases Health and healing effects",
         "description": "<stats>+400 Health<br>+55 Magic Resist<br>+100% Base Health Regen <br>+10% Cooldown Reduction<\/stats><br><br><unique>UNIQUE Passive:<\/unique> Increases self-healing, Health Regen, Lifesteal, and Spell Vamp effects by 20%.",
         "name": "Spirit Visage"
      },
      "3067": {
         "id": 3067,
         "plaintext": "Increases Health and Cooldown Reduction",
         "description": "<stats>+200 Health  <\/stats><br><br><unique>UNIQUE Passive:<\/unique> +10% Cooldown Reduction",
         "name": "Kindlegem"
      },
      "3068": {
         "id": 3068,
         "plaintext": "Constantly deals damage to nearby enemies",
         "description": "<stats>+450 Health<br>+45 Armor  <\/stats><br><br><unique>UNIQUE Passive - Immolate:<\/unique> Deals 25 (+1 per champion level) magic damage per second to nearby enemies.",
         "name": "Sunfire Cape"
      }
   };
  
  // COUNT STRUCTURE
  
  var league={
    id:'',
    totalWinner: 0,
    totalPlayed: 0,
    totalBanned: 0,
    kills: 0,
    assists: 0,
    deaths: 0,
    items:[]
  };
  
  var champ={
    id:'',
    totalTop: 0,
    totalJungle: 0,
    totalMid: 0,
    totalBot: 0,
    totalPlayed: 0,
    normal: {
      totalBanned: 0,
      totalPlayed: 0,
      totalWinner: 0,
      leagues:[]
    },
    ranked: {
      totalBanned: 0,
      totalPlayed: 0,
      totalWinner: 0,
      leagues:[]
    },
    items:[]
  };
  
  var item2={
    id: '',
    name: '',
    img: '',
    normal:{
      totalPlayed: 0,
      totalWinner: 0,
      leagues:[]
    },
    ranked:{
      totalPlayed: 0,
      totalWinner: 0,
      leagues:[]      
    }
  }
  
  var finalGamesObj={ 
    totalPlayed: 0,
    totalBannable: 0,
    totalRanked: 0,
    champions: [],
    leagues:{
      normal:[
        {
          id: 0,
          totalPlayed: 0
        },
        {
          id: 1,
          totalPlayed: 0
        },
        {
          id: 2,
          totalPlayed: 0
        },
        {
          id: 3,
          totalPlayed: 0
        },
        {
          id: 4,
          totalPlayed: 0
        },
        {
          id: 5,
          totalPlayed: 0
        },
        {
          id: 6,
          totalPlayed: 0
        },
        {
          id: 7,
          totalPlayed: 0
        }
      ],
      ranked: [
        {
          id: 0,
          totalPlayed: 0
        },
        {
          id: 1,
          totalPlayed: 0
        },
        {
          id: 2,
          totalPlayed: 0
        },
        {
          id: 3,
          totalPlayed: 0
        },
        {
          id: 4,
          totalPlayed: 0
        },
        {
          id: 5,
          totalPlayed: 0
        },
        {
          id: 6,
          totalPlayed: 0
        },
        {
          id: 7,
          totalPlayed: 0
        }
      ]
    },
    items: []
  };
  
  var initItem2 = function(){
      item2.normal.totalPlayed= 0;
      item2.normal.totalWinner= 0;
      item2.normal.leagues    =[];
      item2.ranked.totalPlayed= 0;
      item2.ranked.totalWinner= 0;
      item2.ranked.leagues    =[];
  }
  
  var initLeague= function(){
    league.totalWinner=0;
    league.totalPlayed=0;
    league.totalBanned= 0;
    league.kills=0;
    league.deaths=0;
    league.assists=0;
    league.items=[];
  }
  
  var initChamp= function(){
    champ.totalTop    = 0;
    champ.totalJungle = 0;
    champ.totalMid    = 0;
    champ.totalBot    = 0;
    champ.totalPlayed    = 0;
    champ.normal.totalBanned=0;
    champ.ranked.totalBanned=0;
    champ.normal.totalPlayed=0;
    champ.ranked.totalPlayed=0;
    champ.normal.totalWinner=0;
    champ.ranked.totalWinner=0;
    champ.normal.leagues=[];
    champ.ranked.leagues=[];
    champ.items=[];
  }
  
  // FINAL STRUCTURE
  
  var finalLeague={
    id:'',
    name: '',
    img: '',
    winrate: '',
    banrate: '',
    pickrate: '',
    kda: '',
    items:[]
  };
  
  var finalChamp={
    id:'',
    name: '',
    subtitle: '',
    img: '',
    topRate: 0,
    midRate: 0,
    botRate: 0,
    jungleRate: 0,
    normal: {
      winrate: '',
      banrate: '',
      pickrate: '',
      leagues:[]
    },
    ranked: {
      winrate: '',
      banrate: '',
      pickrate: '',
      leagues:[]
    }
  };
  
  var finalGeneralItem={
    id:'',
    name: '',
    img: '',
    normal:{
      winrate: '',
      pickrate: '',
      leagues: []
    },
    ranked:{
      winrate: '',
      pickrate: '',
      leagues: []
    }

  }
  
  var finalFinalGamesObj={ 
    totalPlayed: 0,
    champions: [],
    items: []
  }
  
  
  /*
  ---- Auxiliar functions ----
  */
    var getIdLeague = function(name){
        switch (name){
            case 'UNRANKED': return 0
            break;

            case 'BRONZE': return 1
            break;

            case 'SILVER': return 2
            break;

            case 'GOLD': return 3
            break;

            case 'PLATINUM': return 4
            break;

            case 'DIAMOND': return 5
            break;

            case 'MASTER': return 6
            break;

            case 'CHALLENGER': return 7
            break;
        }
    }

    var isMirror = function(array,id){
        var mirror=false;
        for(var i=0; i<array.length; i++){
            if(array[i] == id){
                mirror=true;
            }
        }
        return mirror;
    }

    var leagueAverage = function(participants){
        var result=0;
        for(p in participants){
            result+=getIdLeague(participants[p].highestAchievedSeasonTier);
        }
        return Math.round(result/10);
    }

    var search = function(array, prop, element){
        var pos = -1;
        for(var i=0; i<array.length; i++){
            if(array[i][prop].toString().localeCompare(element.toString())==0){
                pos=i;
            }
        }
        return pos;
    }
  
    var getLeagueNameById = function(id){
        switch (id){
            case 0: return 'UNRANKED'
            break;

            case 1: return 'BRONZE'
            break;

            case 2: return 'SILVER'
            break;

            case 3: return 'GOLD'
            break;

            case 4: return 'PLATINUM'
            break;

            case 5: return 'DIAMOND'
            break;

            case 6: return 'MASTER'
            break;

            case 7: return 'CHALLENGER'
            break;
        }
    }
  
    var roundToTwo = function(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    var calculateRate = function(numerator,denominator){
        if(denominator == 0) return 0
        else return roundToTwo(numerator/denominator*100)
    }

    var getChampionNameById = function(id,version){
        if(championsStaticData[id]) return championsStaticData[id].name;
        else return '';
    }
  
    var getChampionImgById = function(id,version){
        if(championsStaticData[id]) return 'http://ddragon.leagueoflegends.com/cdn/'+version+'/img/champion/'+championsStaticData[id].key.replace(' ','')+'.png';
        else return '';
    }
  
    var getChampionSubtitleById = function(id, version){
        if(championsStaticData[id]) return championsStaticData[id].title;
        else return '';
    }
  
    var getItemNameById = function(id,version){
        if(itemsStaticData[id]) return itemsStaticData[id].name;
        else return '';
    }
  
    var getItemImgById = function(id,version){
        return 'http://ddragon.leagueoflegends.com/cdn/'+version+'/img/item/'+id+'.png';
    }
    
    var isApItem = function (id){
        if((id==1026) || (id==1058) || (id==3089) || (id==3157) || (id==3285) || (id==3116) || (id==3003) 
           || (id==3040) || (id==3027) || (id==3136) || (id==3151) || (id==3135) || (id==3115)
            || (id==3152) || (id==3165) || (id==3174)){
            return true;
        }
        return false;
    }
  
    /*
    ---- FIRST PHASE process function: pure Api results to formatted object with statistics count----
    */
    var firstPhase = function(){
    
        for(m in matches){

          // Match properties
          var champsOnThisMatch = [];
          var isRanked          = matches[m].queueType=='RANKED_SOLO_5x5';
          var isBannableMatch   = (isRanked || (matches[m].queueType=='NORMAL_5x5_DRAFT'));
          var leagueAvg         = leagueAverage(matches[m].participants);
          var leagueAvgName     = getLeagueNameById(leagueAvg);
          var queue             = (isRanked) ? 'ranked':'normal';

          // General data
          finalGamesObj.totalPlayed   += 1;
          finalGamesObj.totalBannable += (isBannableMatch) ? 1 : 0;
          finalGamesObj.totalRanked   += (isRanked) ? 1 : 0;
          finalGamesObj.leagues[queue][leagueAvg].totalPlayed+=1;

          for(p in matches[m].participants){

            // Player properties
            var championId  = matches[m].participants[p].championId;
            var isWinner    = matches[m].participants[p].stats.winner;
            var kills       = matches[m].participants[p].stats.kills;
            var assists     = matches[m].participants[p].stats.assists;
            var deaths      = matches[m].participants[p].stats.deaths;
            var lane        = matches[m].participants[p].timeline.lane;


            // Items Data
            var itemId = 0;
            for (var i = 0; i < 7; i++) {
              itemId = matches[m].participants[p].stats['item'+i];
              if (itemId != 0) {
                var positem = search (finalGamesObj.items, 'id', itemId);
                if (positem >- 1){
                  finalGamesObj.items[positem][queue].totalWinner += (isWinner) ? 1 : 0;
                  finalGamesObj.items[positem][queue].totalPlayed += 1;

                  var posleague = search(finalGamesObj.items[positem][queue].leagues, 'id', leagueAvg);

                  if(posleague>-1){
                    finalGamesObj.items[positem][queue].leagues[posleague].totalWinner  += (isWinner) ? 1 : 0;
                    finalGamesObj.items[positem][queue].leagues[posleague].totalPlayed  += 1;
                  }
                  else{// ------------------------------------------------------------------------
                    //leagueItem.id           = leagueAvg;
                    //leagueItem.name         = leagueAvgName;
                    //leagueItem.totalPlayed  = 1;
                    //leagueItem.totalWinner  = (isWinner) ? 1 : 0;
                    finalGamesObj.items[positem][queue].leagues.push(angular.copy({
                      id           : leagueAvg,
                      name         : leagueAvgName,
                      totalPlayed  : 1,
                      totalWinner  : (isWinner) ? 1 : 0
                    }));
                  }
                }
                else{
                  item2.id    = itemId;
                  item2.name  = getItemNameById(item2.id,version);
                  item2.img   = getItemImgById(item2.id,version);
                  item2[queue].totalPlayed = 1;
                  item2[queue].totalWinner = (isWinner) ? 1 : 0;
                  //leagueItem.id           = leagueAvg;
                  //leagueItem.name         = leagueAvgName;
                  //leagueItem.totalPlayed  = 1;
                  //leagueItem.totalWinner  = (isWinner) ? 1 : 0;

                  item2[queue].leagues.push({//angular.copy
                    id           : leagueAvg,
                    name         : leagueAvgName,
                    totalPlayed  : 1,
                    totalWinner  : (isWinner) ? 1 : 0
                  });

                  finalGamesObj.items.push(angular.copy(item2));
                  initItem2();
                }
              }
            }


            // Searching player's champion ID in champions array: pos > -1: found and returned position in array, pos == -1 not found
            var pos = search(finalGamesObj.champions, 'id', championId);

            if(pos>-1){
              var isMirrorB = isMirror(champsOnThisMatch, championId);
              // Champion data + solving mirror's problem
              if(!isMirrorB){
                finalGamesObj.champions[pos][queue].totalPlayed += 1;
                finalGamesObj.champions[pos][queue].totalWinner += (isWinner) ? 1 : 0;
                champsOnThisMatch.push(angular.copy(championId));
              }
              else{
                if(isWinner) finalGamesObj.champions[pos][queue].totalWinner+=0.5;
                else finalGamesObj.champions[pos][queue].totalWinner-=0.5; 
              }
              finalGamesObj.champions[pos].totalPlayed+= 1;

              // Lane Data
              if(lane=='TOP')         finalGamesObj.champions[pos].totalTop    += 1;
              else if(lane=='MIDDLE') finalGamesObj.champions[pos].totalMid    += 1;
              else if(lane=='BOTTOM') finalGamesObj.champions[pos].totalBot    += 1;
              else if(lane=='JUNGLE') finalGamesObj.champions[pos].totalJungle += 1;

              // Searching league in champion + queue combination
              var posleague= search(finalGamesObj.champions[pos][queue].leagues, 'id', leagueAvg);

              if(posleague>-1){

                // League data + solving mirror's problem

                if(!isMirrorB){
                  finalGamesObj.champions[pos][queue].leagues[posleague].totalPlayed  +=1;
                  finalGamesObj.champions[pos][queue].leagues[posleague].totalWinner  += (isWinner) ? 1 : 0;
                }
                else{
                  if(isWinner) finalGamesObj.champions[pos][queue].leagues[posleague].totalWinner+=0.5;
                  else finalGamesObj.champions[pos][queue].leagues[posleague].totalWinner-=0.5; 
                }

                finalGamesObj.champions[pos][queue].leagues[posleague].kills        +=kills;
                finalGamesObj.champions[pos][queue].leagues[posleague].assists      +=assists;
                finalGamesObj.champions[pos][queue].leagues[posleague].deaths       +=deaths;

                // Searching each item in champion + league + queue combination
                for(i=0; i<7; i++){
                  if(matches[m].participants[p].stats['item'+i]!=0){
                    var positem = search(finalGamesObj.champions[pos][queue].leagues[posleague].items, 'id', matches[m].participants[p].stats['item'+i]);

                    if(positem>-1){
                      finalGamesObj.champions[pos][queue].leagues[posleague].items[positem].totalWinner += (isWinner) ? 1 : 0;
                      finalGamesObj.champions[pos][queue].leagues[posleague].items[positem].totalPlayed += 1;
                    }
                    else{

                      finalGamesObj.champions[pos][queue].leagues[posleague].items.push({//angular.copy
                        id          : matches[m].participants[p].stats['item'+i],
                        totalWinner : (isWinner) ? 1 : 0,
                        totalPlayed : 1
                      });
                    }
                  }
                }
              }
              else{

                // League + item data
                league.id           =leagueAvg;
                league.totalPlayed  +=1;
                league.kills        +=kills;
                league.assists      +=assists;
                league.deaths       +=deaths;
                league.totalWinner  += (isWinner) ? 1 : 0;

                for(i=0; i<7; i++){
                  league.items.push({//angular.copy
                    id          : matches[m].participants[p].stats['item'+i],
                    totalWinner : (isWinner) ? 1 : 0,
                    totalPlayed : 1
                  });
                }

                finalGamesObj.champions[pos][queue].leagues.push(angular.copy(league));
                initLeague();
              }
            }
            else{

              // Champion + league + item data
              champ.id            =championId;
              champ.totalPlayed   +=1;
              league.id           =leagueAvg;
              league.totalPlayed  +=1;
              league.kills        +=kills;
              league.deaths       +=deaths;
              league.assists      +=assists;
              league.totalWinner  += (isWinner) ? 1 : 0;

              // Lane Data
              if(lane=='TOP')         champ.totalTop    += 1;
              else if(lane=='MIDDLE') champ.totalMid    += 1;
              else if(lane=='BOTTOM') champ.totalBot    += 1;
              else if(lane=='JUNGLE') champ.totalJungle += 1;

              for(i=0; i<7; i++){
                if(matches[m].participants[p].stats['item'+i]!=0){

                  league.items.push({//angular.copy
                    id          : matches[m].participants[p].stats['item'+i],
                    totalWinner : (isWinner) ? 1 : 0,
                    totalPlayed : 1
                  });
                }
              }

              champ[queue].totalPlayed  += 1;
              champ[queue].totalWinner  += (isWinner) ? 1 : 0;
              champ[queue].leagues.push(angular.copy(league));
              initLeague();
              finalGamesObj.champions.push(angular.copy(champ));
              initChamp();

            }
          }

          // Bans
          for(t in matches[m].teams){
            for(b in matches[m].teams[t].bans){

              // Searching ban's champion ID in champions array
              var pos = search(finalGamesObj.champions, 'id', matches[m].teams[t].bans[b].championId);

              if(pos>-1){
                finalGamesObj.champions[pos][queue].totalBanned+=1;
                var posleague = search(finalGamesObj.champions[pos][queue].leagues, 'id', leagueAvg);
                if(posleague>-1) finalGamesObj.champions[pos][queue].leagues[posleague].totalBanned+=1;
                else{
                  /*league.id=leagueAvg;
                  league.totalBanned=1;*/
                  finalGamesObj.champions[pos][queue].leagues.push({
                    id: leagueAvg,
                    totalBanned: 1,
                    totalWinner: 0,
                    totalPlayed: 0,
                    kills: 0,
                    assists: 0,
                    deaths: 0,
                    items:[]
                  });

                }
              }
              else{

                // Ban data
                champ.id                  =matches[m].teams[t].bans[b].championId;
                champ[queue].totalBanned  +=1;
                league.id                 =leagueAvg;
                league.totalBanned        =1;

                champ[queue].leagues.push(angular.copy(league));
                initLeague();

                finalGamesObj.champions.push(angular.copy(champ));
                initChamp();
              }

            }
          }
        }
    
  }
  
    /*
    ---- SECOND PHASE process function: first phase's formatted object to calculated rates and statistics object ----
    */  
    var secondPhase = function(){

        finalFinalGamesObj.totalPlayed = finalGamesObj.totalPlayed;

        for(var g in finalGamesObj.items){
          var queue = 'normal';
          finalGeneralItem.id   = finalGamesObj.items[g].id;
          finalGeneralItem.name = getItemNameById(finalGeneralItem.id,version);
          finalGeneralItem.img  = '';
          for(var iterator=0; iterator<2; iterator++){
            var isRanked = (queue=='ranked');
            finalGeneralItem[queue].winrate   = calculateRate(finalGamesObj.items[g][queue].totalWinner,finalGamesObj.items[g][queue].totalPlayed);
            finalGeneralItem[queue].pickrate  = (isRanked) ? calculateRate(finalGamesObj.items[g][queue].totalPlayed,finalGamesObj.totalRanked*10) : calculateRate(finalGamesObj.items[g][queue].totalPlayed,(finalGamesObj.totalPlayed-finalGamesObj.totalRanked)*10);

            for(var gleague in finalGamesObj.items[g][queue].leagues){
              finalGeneralItem[queue].leagues.push({//angular.copy
                id       : finalGamesObj.items[g][queue].leagues[gleague].id,
                name     : getLeagueNameById(finalGamesObj.items[g][queue].leagues[gleague].id),
                winrate  : calculateRate(finalGamesObj.items[g][queue].leagues[gleague].totalWinner,finalGamesObj.items[g][queue].leagues[gleague].totalPlayed),
                pickrate : calculateRate(finalGamesObj.items[g][queue].leagues[gleague].totalPlayed,finalGamesObj.leagues[queue][finalGamesObj.items[g][queue].leagues[gleague].id].totalPlayed*10)
              });
            }
            queue = 'ranked';
          }
          finalFinalGamesObj.items.push(angular.copy(finalGeneralItem));
          finalGeneralItem.normal.leagues=[];
          finalGeneralItem.ranked.leagues=[];
        }

        for(c in finalGamesObj.champions){

          finalChamp.id         = finalGamesObj.champions[c].id;
          finalChamp.name       = getChampionNameById(finalChamp.id, version);
          finalChamp.img        = getChampionImgById(finalChamp.id, version);
          finalChamp.subtitle   = getChampionSubtitleById(finalChamp.id, version);
          finalChamp.topRate    = calculateRate(finalGamesObj.champions[c].totalTop,finalGamesObj.champions[c].totalPlayed);
          finalChamp.botRate    = calculateRate(finalGamesObj.champions[c].totalBot,finalGamesObj.champions[c].totalPlayed);
          finalChamp.midRate    = calculateRate(finalGamesObj.champions[c].totalMid,finalGamesObj.champions[c].totalPlayed);
          finalChamp.jungleRate = calculateRate(finalGamesObj.champions[c].totalJungle,finalGamesObj.champions[c].totalPlayed);

          var queue = 'normal';
          for(iterator=0; iterator<2; iterator++){

            finalChamp[queue].winrate = calculateRate(finalGamesObj.champions[c][queue].totalWinner,finalGamesObj.champions[c][queue].totalPlayed);
            if(queue == 'normal'){
              finalChamp[queue].pickrate = calculateRate(finalGamesObj.champions[c][queue].totalPlayed,(finalGamesObj.totalPlayed-finalGamesObj.totalRanked));
              finalChamp[queue].banrate  = calculateRate(finalGamesObj.champions[c][queue].totalBanned,(finalGamesObj.totalBannable-finalGamesObj.totalRanked));
            }
            else{
              finalChamp[queue].pickrate = calculateRate(finalGamesObj.champions[c][queue].totalPlayed,finalGamesObj.totalRanked);
              finalChamp[queue].banrate  = calculateRate(finalGamesObj.champions[c][queue].totalBanned,finalGamesObj.totalRanked);
            }

            for(l in finalGamesObj.champions[c][queue].leagues){
              finalLeague.id      = finalGamesObj.champions[c][queue].leagues[l].id;
              finalLeague.name    = getLeagueNameById(finalLeague.id);
              finalLeague.pickrate= calculateRate(finalGamesObj.champions[c][queue].leagues[l].totalPlayed,finalGamesObj.leagues[queue][finalLeague.id].totalPlayed);
              finalLeague.winrate = calculateRate(finalGamesObj.champions[c][queue].leagues[l].totalWinner,finalGamesObj.champions[c][queue].leagues[l].totalPlayed);
              finalLeague.banrate = calculateRate(finalGamesObj.champions[c][queue].leagues[l].totalBanned,finalGamesObj.leagues[queue][finalLeague.id].totalPlayed);
              finalLeague.kda     = roundToTwo(finalGamesObj.champions[c][queue].leagues[l].kills/finalGamesObj.champions[c][queue].leagues[l].deaths+finalGamesObj.champions[c][queue].leagues[l].assists/finalGamesObj.champions[c][queue].leagues[l].deaths);


              for(i in finalGamesObj.champions[c][queue].leagues[l].items){
                finalLeague.items.push({ //angular.copy
                    id      : finalGamesObj.champions[c][queue].leagues[l].items[i].id,
                    name    : getItemNameById(finalGamesObj.champions[c][queue].leagues[l].items[i].id, version),
                    img     : '',
                    winrate : calculateRate(finalGamesObj.champions[c][queue].leagues[l].items[i].totalWinner,finalGamesObj.champions[c][queue].leagues[l].items[i].totalPlayed),
                    pickrate: calculateRate(finalGamesObj.champions[c][queue].leagues[l].items[i].totalPlayed,finalGamesObj.champions[c][queue].leagues[l].totalPlayed)
                });
              }
              finalChamp[queue].leagues.push(angular.copy(finalLeague));
              finalLeague.items=[];
            }
            queue = 'ranked';
          }
          finalFinalGamesObj.champions.push(angular.copy(finalChamp));
          finalChamp.normal.leagues=[];
          finalChamp.ranked.leagues=[];
        }
       json=finalFinalGamesObj;
    } 
  
    /*
    ---- LAST PHASE process function: reduce item's data to AP items ----
    */  
    var lastPhase = function(){
        var array = [];
        for (x in json.items ){
            if(isApItem(json.items[x].id)){
                array.push(angular.copy(json.items[x]));
            }
        }
        json.items=array;

        for(champ in json.champions){
            json.champions[champ].img =getChampionImgById(json.champions[champ].id,version);
            var queue='normal';
            for(var i=0; i<2; i++){

                for(league in json.champions[champ][queue].leagues){
                    var array2 = [];
                    var bestItems = {
                        winrate : [{
                            n: 0,
                            pos: -1
                        },
                        {
                            n: 0,
                            pos: -1
                        },
                        {
                            n: 0,
                            pos: -1
                        }],
                        pickrate : [{
                            n: 0,
                            pos: -1
                        },
                        {
                            n: 0,
                            pos: -1
                        },
                        {
                            n: 0,
                            pos: -1
                        }]
                    }

                    for(var i=0; i<json.champions[champ][queue].leagues[league].items.length; i++){
                        if(json.champions[champ][queue].leagues[league].items[i].winrate>=bestItems.winrate[0].n){
                            bestItems.winrate[2] = angular.copy(bestItems.winrate[1]);
                            bestItems.winrate[1] = angular.copy(bestItems.winrate[0]);
                            bestItems.winrate[0].n = json.champions[champ][queue].leagues[league].items[i].winrate;
                            bestItems.winrate[0].pos = i;
                        }
                        if(json.champions[champ][queue].leagues[league].items[i].pickrate>=bestItems.pickrate[0].n){
                            bestItems.pickrate[2] = angular.copy(bestItems.pickrate[1]);
                            bestItems.pickrate[1] = angular.copy(bestItems.pickrate[0]);
                            bestItems.pickrate[0].n = json.champions[champ][queue].leagues[league].items[i].pickrate;
                            bestItems.pickrate[0].pos = i;
                        }
                    }

                    for(var i=0; i<3; i++){
                        for(var j=0; j<3; j++){
                            if(bestItems.winrate[i].pos==bestItems.pickrate[j].pos){
                                bestItems.pickrate[i].pos=-1;
                            }
                        }
                    }
                    var rate= 'winrate';
                    for(var i=0; i<2; i++){
                        for(var j=0; j<3; j++){
                            if(bestItems[rate][j].pos!=-1){
                                array2.push(angular.copy(json.champions[champ][queue].leagues[league].items[bestItems[rate][j].pos]));
                            }
                        }
                        rate= 'pickrate';
                    }


                    json.champions[champ][queue].leagues[league].items=angular.copy(array2);
                }
                queue='ranked';
            }
        }
        console.log(json);
    }

    var saveTextAsFile = function(){

        var str = JSON.stringify(json)

        var textToWrite = str;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = 'prueba.json';

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    var destroyClickedElement = function(event){
        document.body.removeChild(event.target);
    }

    $scope.start = function(){
        Svc.loadFileIds();
        $scope.info=Svc.config;
    }

    $scope.$on('object-process', function(){
        console.log('---- JSON formatter starts ----');
        matches=Svc.config.result;
        firstPhase();
        secondPhase();
        lastPhase();
        console.log('----------- END -----------');
        saveTextAsFile();
    });
  
})

.constant("Urls", {
    'base_url': 'https://euw.api.pvp.net/api/lol/',
    'keys': [
        // HERE GO THE API KEYS
        ],
    'server_api': 'http://localhost:9000/api/matchs/',

    'match_url': '/v2.2/match/'
})

.factory('Svc', function ($http, $timeout, Urls, $rootScope) {

        var ids = null;

        var execQueue = function(){
            api.config.wait = false;
            for(var i=0; i < api.config.requestMax; i++, api.config.current++){

                var id = ids[api.config.done + i];
                var apikey = Urls.keys[(api.config.done + i) % Urls.keys.length];
                

                var url_final = Urls.base_url + 'euw' + Urls.match_url + id;

                $http.get(url_final, { params: { api_key: apikey } }).success(function(data, code){
                    api.config.current--;
                    api.config.success++;
                    api.config.result.push(angular.copy(data));


                    if(api.config.current == 0 && api.config.done < api.config.total){
                        api.config.done += api.config.requestMax;
                        $timeout(execQueue, api.config.waitingTime);
                        api.config.wait = true;
                    }
                    
                    if(api.config.done == api.config.total){
                        console.log('---- crawler finished ----');
                        $rootScope.$broadcast('object-process');
                    }


                }).error(function(error, code){
                    api.config.current--;
                    api.config.failed++;

                    if(api.config.current == 0 && api.config.done < api.config.total){
                        api.config.done += api.config.requestMax;
                        $timeout(execQueue, api.config.waitingTime);
                        api.config.wait = true;
                    }
                });
            }


        };

        var api = {};

        api.config = {
            result: [],
            total: 0,
            current: 0,
            done: 0,
            failed: 0,
            success: 0,
            requestMax: 25,
            wait: false,
            waitingTime: 10000
        };

        api.loadFileIds = function(){
            console.log('---- loading JSON matchIds file ----')
            $http.get('jsons/EUW.json').success(function(data){
                console.log(data);
                ids = data;
                api.config.total = ids.length;
                execQueue();
                console.log('---- crawler starts ----');
            });
        };

    
        return api;
    });
