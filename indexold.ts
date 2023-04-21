export const encrypt = (str: string): string => {
    const reverse = str.split('').reverse().join('')
    return 'encrypted_' + reverse
  }
  
  export const decrypt = (str: string): string => {
    const strip = str.substr(10)  // Let us remove the 'encrypted_' part
    return strip.split('').reverse().join('')
  }
  
  