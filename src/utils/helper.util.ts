import * as bcrpyt from 'bcrypt';

/**
 * Gera um hash para a senha.
 * @param {string} password - Senha original. 
 * @returns {Promise<String>} Hash da senha.
 */
export async function hashPassword(password: string): Promise<String> {
    const saltRound = 8;
    return await bcrpyt.hash(password,saltRound);
}

/**
 * Comparar a senha com o hash do banco de dados.
 * @param {string} password - Senha dada pelo usuário.
 * @param {string} hash - Hash da senha salva no banco de dados.
 * @returns {Promise<boolean>} returna true se a senha e o hash coincidirem, e false caso o contrário.
 */
export async function comparePassword(password: string, hash: string): Promise<Boolean> {
    return await bcrpyt.compare(password, hash);
}

/**
 * Calcule o offset para consultas paginadas.
 * @param {number} page - O número da página atual.
 * @param {number} limit - O número de itens por página.
 * @returns {number} Offset calculado 
 */
export function calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit;
}