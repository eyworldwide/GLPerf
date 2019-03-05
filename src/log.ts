const color = "text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px; font-size: 40px; color: #ffffff;"

export function colorLog(args: any) {
  console.log(`%c${args}`, color)
}

export function log (...args: any) {
  console.log('🚀 [GLPerf]', ...args)
}

export function errorLog (...args: any) {
  console.error('🚀 [GLPerf]', ...args)
}