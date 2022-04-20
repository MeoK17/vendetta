const query = require('../core/sMysql').query

const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
const creatorPlayerHeading = -185.0;

let creatorDimension = 1;

mp.events.add("playerJoin", (player) => {
    player.colorForOverlayIdx = function(index) {
        let color;

        switch (index) {
            case 1:
                color = this.customCharacter.BeardColor;
            break;

            case 2:
                color = this.customCharacter.EyebrowColor;
            break;

            case 5:
                color = this.customCharacter.BlushColor;
            break;

            case 8:
                color = this.customCharacter.LipstickColor;
            break;

            case 10:
                color = this.customCharacter.ChestHairColor;
            break;

            default:
                color = 0;
        }

        return color;
    };

    player.defaultCharacter = function() {
        this.customCharacter = {
            Gender: 0,

            Father: 0,
            Mother: 0,
            Similarity: 1.0,
            SkinSimilarity: 1.0,

            Features: [],
            Appearance: [],

            Hair: {
                Hair: 0,
                Color: 0,
                HighlightColor: 0
            },

            EyebrowColor: 0,
            BeardColor: 0,
            EyeColor: 0,
            BlushColor: 0,
            LipstickColor: 0,
            ChestHairColor: 0
        };

        for (let i = 0; i < 20; i++) this.customCharacter.Features.push(0.0);
        for (let i = 0; i < 10; i++) this.customCharacter.Appearance.push({Value: 255, Opacity: 1.0});
        //player.applyCharacter();
    };

    player.applyCharacter = function() {
        this.setCustomization(
            this.customCharacter.Gender == 0,

            this.customCharacter.Mother,
            this.customCharacter.Father,
            0,

            this.customCharacter.Mother,
            this.customCharacter.Father,
            0,

            this.customCharacter.Similarity,
            this.customCharacter.SkinSimilarity,
            0.0,

            this.customCharacter.EyeColor,
            this.customCharacter.Hair.Color,
            this.customCharacter.Hair.HighlightColor,

            this.customCharacter.Features
        );

        this.setClothes(2, this.customCharacter.Hair.Hair, 0, 2);
        for (let i = 0; i < 10; i++) this.setHeadOverlay(i, [this.customCharacter.Appearance[i].Value, this.customCharacter.Appearance[i].Opacity, this.colorForOverlayIdx(i), 0]);
    };

    player.loadCharacter = async function() {
        const rows = await query('SELECT * FROM `customization` WHERE name = ?', [this.name])
        try {
            const row = rows[0]
            this.customCharacter = {
                Gender: row.Gender,
    
                Father: row.ParentsFather,
                Mother: row.ParentsMother,
                Similarity: row.Similarity,
                SkinSimilarity: row.SkinSimilarity,
    
                Features: JSON.parse(row.Features),
                Appearance: JSON.parse(row.Appearance),
    
                Hair: {
                    Hair: row.Hair,
                    Color: row.HairColor,
                    HighlightColor: row.HairHighlightColor
                },
    
                EyebrowColor: row.EyebrowColor,
                BeardColor: row.BeardColor,
                EyeColor: row.EyeColor,
                BlushColor: row.BlushColor,
                LipstickColor: row.LipstickColor,
                ChestHairColor: row.ChestHairColor
            }
            this.applyCharacter();
        } catch {
            //console.error(`player.loadCharacter: Исправить позже`);
            this.defaultCharacter();
            player.sendToCreator();
        }
    };

    player.saveCharacter = async function() {
        const c = this.customCharacter
        await query(`INSERT INTO customization VALUES(
            '${this.name}',
            ${c.Gender}, 
            ${c.Father}, 
            ${c.Mother}, 
            ${c.Similarity}, 
            ${c.SkinSimilarity}, 
            '${JSON.stringify(c.Features)}', 
            '${JSON.stringify(c.Appearance)}', 
            ${c.Hair.Hair}, 
            ${c.Hair.Color}, 
            ${c.Hair.HighlightColor}, 
            ${c.EyebrowColor}, 
            ${c.BeardColor}, 
            ${c.EyeColor}, 
            ${c.BlushColor}, 
            ${c.LipstickColor}, 
            ${c.ChestHairColor}
            )`);
    };
	
    player.sendToCreator = function() {
        player.preCreatorPos = player.position;
        player.preCreatorHeading = player.heading;
        player.preCreatorDimension = player.dimension;

        player.position = creatorPlayerPos;
        player.heading = creatorPlayerHeading;
        player.dimension = creatorDimension;
        player.usingCreator = true;
        player.changedGender = false;
        player.call("character:CreatorCamera");

        creatorDimension++;
    };

    player.sendToWorld = function() {
        player.position = new mp.Vector3(-537.01, -218.18, 37.65, 208.02);
        player.heading = 211;
        player.dimension = player.preCreatorDimension;
        player.usingCreator = false;
        player.changedGender = false;
        player.call("character:DestroyCamera");
    };
});

/*mp.events.add("creator_GenderChange", (player, gender) => {
    player.model = freemodeCharacters[gender];
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
    player.changedGender = true;
});*/

mp.events.add("character:SaveCharacter", (player, gender, father, mother, similarity, skinSimilarity, featureData, appearanceData, hairAndColorData) => {
    player.customCharacter.Gender = gender;
    player.customCharacter.Father = father;
    player.customCharacter.Mother = mother;
    player.customCharacter.Similarity = similarity;
    player.customCharacter.SkinSimilarity = skinSimilarity;
    player.customCharacter.Features = JSON.parse(featureData);
    player.customCharacter.Appearance = JSON.parse(appearanceData);

    let hairAndColors = JSON.parse(hairAndColorData);
    player.customCharacter.Hair = {Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2]};
    player.customCharacter.EyebrowColor = hairAndColors[3];
    player.customCharacter.BeardColor = hairAndColors[4];
    player.customCharacter.EyeColor = hairAndColors[5];
    player.customCharacter.BlushColor = hairAndColors[6];
    player.customCharacter.LipstickColor = hairAndColors[7];
    player.customCharacter.ChestHairColor = hairAndColors[8];

    player.saveCharacter();
    player.applyCharacter();
    player.sendToWorld();
});

mp.events.add("creator_Leave", (player) => {
    if (player.changedGender) player.loadCharacter();
    player.applyCharacter();
    player.sendToWorld();
});