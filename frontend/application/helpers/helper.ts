export const debounce = (fn:any,timeout = 1000) =>{
	let tik:ReturnType<typeof setTimeout>
	return (...args:any) =>{
		clearTimeout(tik)
		setTimeout(()=>{
			tik = setTimeout(() => { fn.apply(this, args); }, timeout);
			
		})
	}
}
