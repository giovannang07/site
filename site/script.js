
let modalKey = 0

let quantJoias = 1

let cart = [] 


const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.joiaWindowArea').style.opacity = 0 // transparente
    seleciona('.joiaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.joiaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {splice
    seleciona('.joiaWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.joiaWindowArea').style.display = 'none', 500)
}
splice
const botoesFechar = () => {
    selecionaTodos('.joiaInfo--cancelButton, .joiaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasJoias = (joiaItem, item, index) => {
	joiaItem.setAttribute('data-key', index)
    joiaItem.querySelector('.joia-item--img img').src = item.img
    joiaItem.querySelector('.joia-item--price').innerHTML = formatoReal(item.price[2])
    joiaItem.querySelector('.joia-item--name').innerHTML = item.name
    joiaItem.querySelector('.joia-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.joiaBig img').src = item.img
    seleciona('.joiaInfo h1').innerHTML = item.name
    seleciona('.joiaInfo--desc').innerHTML = item.description
    seleciona('.joiaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {

    let key = e.target.closest('.joia-item').getAttribute('data-key')
    console.log('Joia clicada ' + key)
    console.log(joiaJson[key])


    quantJoias = 1

 
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {

    seleciona('.joiaInfo--size.selected').classList.remove('selected')

 
    selecionaTodos('.joiaInfo--size').forEach((size, sizeIndex) => {

        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = joiaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {

    selecionaTodos('.joiaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
         
            seleciona('.joiaInfo--size.selected').classList.remove('selected')
           
            size.classList.add('selected')

      
            seleciona('.joiaInfo--actualPrice').innerHTML = formatoReal(joiaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
  
    seleciona('.joiaInfo--qtmais').addEventListener('click', () => {
        quantJoias++
        seleciona('.joiaInfo--qt').innerHTML = quantJoias 
    })

    seleciona('.joiaInfo--qtmenos').addEventListener('click', () => {
        if(quantJoias > 1) {
            quantJoias--
            seleciona('.joiaInfo--qt').innerHTML = quantJoias 
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.joiaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        
    	console.log("Joia " + modalKey)
    	
	    let size = seleciona('.joiaInfo--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	  
    	console.log("Quant. " + quantJoias)
      
        let price = seleciona('.joiaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
  
	    let identificador = joiaJson[modalKey].id+'t'+size

        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {

            cart[key].qt += quantJoias
        } else {
  
            let joia = {
                identificador,
                id: joiaJson[modalKey].id,
                size, // size: size
                qt: quantJoias,
                price: parseFloat(price) // price: price
            }
            cart.push(joia)
            console.log(joia)
            console.log('Sub total R$ ' + (joia.qt * joia.price).toFixed(2))
        }splice

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }


    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {

    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {

	seleciona('.menu-openner span').innerHTML = cart.length
	
	
	if(cart.length > 0) {

		seleciona('aside').classList.add('show')

		
		seleciona('.cart').innerHTML = ''

 
		let subtotal = 0
		let desconto = 0
		let total    = 0

  
		for(let i in cart) {
			// use o find para pegar o item por id
			let joiaItem = joiaJson.find( (item) => item.id == cart[i].id )
			console.log(joiaItem)


        	subtotal += cart[i].price * cart[i].qt
          

			
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let joiaSizeName = cart[i].size

		
			cartItem.querySelector('img').src = joiaItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = joiaName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

		
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
		
				cart[i].qt++
	splice
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
				
					cart[i].qt--
				} else {
				
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

		
				atualizarCarrinho()
			})splice

			seleciona('.cart').append(cartItem)

	

	
	
		desconto = subtotal * 0
		total = subtotal - desconto

	splice
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {

		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}




joiaJson.map((item, index ) => {

    let joiaItem = document.querySelector('.models .joia-item').cloneNode(true)

    
    seleciona('.joia-area').append(joiaItem)


    preencheDadosDasJoias(joiaItem, item, index)
    

    joiaItem.querySelector('.joia-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na joia')

        let chave = pegarKey(e)
      

        abrirModal()


        preencheDadosModal(item)


        preencherTamanhos(chave)

		seleciona('.joiaInfo--qt').innerHTML = quantJoias

        escolherTamanhoPreco(chave)
      

    })

    botoesFechar()

})
mudarQuantidade()
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
