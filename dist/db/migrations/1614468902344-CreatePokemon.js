"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePokemon1614468902344 = void 0;
const typeorm_1 = require("typeorm");
class CreatePokemon1614468902344 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'pokemons',
            columns: [
                {
                    name: 'id',
                    type: 'INTEGER',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'image_url',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        queryRunner.dropTable('pokemons');
    }
}
exports.CreatePokemon1614468902344 = CreatePokemon1614468902344;
//# sourceMappingURL=1614468902344-CreatePokemon.js.map