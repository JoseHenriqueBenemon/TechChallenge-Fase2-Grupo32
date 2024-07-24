import * as bcrpyt from 'bcrypt';

/**
 * Gera um hash para a senha.
 * @param {string} password - Senha original. 
 * @returns {Promise<String>} Hash da senha.
 */
export async function hashPassword(password: string): Promise<string> {
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

/**
 * Valida se um email é válido.
 * @param {string} email - O email a ser validado.
 * @returns {boolean} True se o email for válido, caso contrário false.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida se uma senha atende aos critérios especificados.
 * Critérios: Pelo menos 8 caracteres, pelo menos uma letra minúscula, uma letra maiúscula, um dígito e um caractere especial.
 * @param {string} password - A senha a ser validada.
 * @returns {boolean} True se a senha atender aos critérios, caso contrário false.
 */
export function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}