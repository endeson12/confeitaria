import React, { useState } from 'react'

// Ícones SVG
const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
)

const HeartIcon = ({ className = "w-6 h-6", filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const MinusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

// Dados dos produtos
const productsData = [
  {
    id: 1,
    name: "Bolo de Chocolate Premium",
    price: 65.00,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
    description: "Bolo de chocolate belga com ganache e morangos frescos",
    category: "Bolos"
  },
  {
    id: 2,
    name: "Torta de Morango Especial",
    price: 78.00,
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop",
    description: "Torta cremosa com morangos frescos e chantilly artesanal",
    category: "Tortas"
  },
  {
    id: 3,
    name: "Brigadeiros Gourmet",
    price: 35.00,
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
    description: "Caixa com 15 brigadeiros artesanais de sabores variados",
    category: "Doces"
  },
  {
    id: 4,
    name: "Coxinhas Premium",
    price: 24.00,
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
    description: "Porção com 8 coxinhas crocantes de frango desfiado",
    category: "Salgados"
  },
  {
    id: 5,
    name: "Bolo Red Velvet",
    price: 72.00,
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=200&fit=crop",
    description: "Bolo aveludado com cream cheese e decoração especial",
    category: "Bolos"
  },
  {
    id: 6,
    name: "Torta de Limão",
    price: 58.00,
    img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=300&h=200&fit=crop",
    description: "Torta refrescante com merengue suíço queimado",
    category: "Tortas"
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showNotification, setShowNotification] = useState(false)

  // Funções do carrinho
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Notificação */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Item adicionado ao carrinho! ✅
        </div>
      )}

      {/* Navegação */}
      <nav className="bg-white/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-primary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text">
                Delícias da Casa 🍰
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === 'home' 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                    : 'text-neutral-700 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                Início
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === 'catalog' 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                    : 'text-neutral-700 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                Catálogo
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === 'about' 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                    : 'text-neutral-700 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                Sobre Nós
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === 'contact' 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                    : 'text-neutral-700 hover:bg-primary-100 hover:text-primary-600'
                }`}
              >
                Contato
              </button>
              <button
                onClick={() => setCurrentPage('cart')}
                className="relative p-3 text-neutral-700 hover:bg-primary-100 hover:text-primary-600 rounded-xl transition-all duration-300"
              >
                <ShoppingCartIcon />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {/* Página Inicial */}
        {currentPage === 'home' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text leading-tight">
                  O sabor que adoça seus momentos! ✨
                </h2>
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Descubra nossas delícias artesanais feitas com muito carinho e ingredientes selecionados
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentPage('catalog')}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  Ver Catálogo 🛒
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="bg-white/80 backdrop-blur-sm border-2 border-primary-300 text-primary-600 font-bold py-4 px-8 rounded-2xl text-xl hover:bg-primary-50 transition-all duration-300"
                >
                  Sobre Nós 💖
                </button>
              </div>
            </div>

            {/* Produtos em Destaque */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-center text-gray-800">
                🌟 Produtos em Destaque
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData.slice(0, 6).map(product => (
                  <div key={product.id} className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                    <div className="relative">
                      <img 
                        src={product.img} 
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <HeartIcon 
                          className={`w-6 h-6 ${
                            favorites.includes(product.id) 
                              ? 'text-red-500' 
                              : 'text-gray-400 hover:text-red-400'
                          }`}
                          filled={favorites.includes(product.id)}
                        />
                      </button>
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                          <PlusIcon className="w-4 h-4" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Página do Catálogo */}
        {currentPage === 'catalog' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text">
                Nosso Catálogo Completo
              </h2>
              <p className="text-xl text-gray-600">
                Explore todos os nossos produtos deliciosos
              </p>
            </div>

            {/* Barra de Busca */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos deliciosos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-primary-200 rounded-2xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none text-lg bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>
            </div>

            {/* Filtros por Categoria */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Todos', 'Bolos', 'Tortas', 'Doces', 'Salgados'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-pink-100 hover:text-pink-600 border-2 border-pink-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                  <div className="relative">
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <HeartIcon 
                        className={`w-6 h-6 ${
                          favorites.includes(product.id) 
                            ? 'text-red-500' 
                            : 'text-gray-400 hover:text-red-400'
                        }`}
                        filled={favorites.includes(product.id)}
                      />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-black text-transparent bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <PlusIcon className="w-4 h-4" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl text-gray-500">
                  Nenhum produto encontrado 😔
                </p>
                <p className="text-lg text-gray-400 mt-2">
                  Tente buscar por outro termo ou categoria
                </p>
              </div>
            )}
          </div>
        )}

        {/* Página do Carrinho */}
        {currentPage === 'cart' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text">
                Seu Carrinho 🛒
              </h2>
              <p className="text-xl text-gray-600 mt-4">
                {cart.length === 0 ? 'Seu carrinho está vazio' : `${getCartItemsCount()} itens selecionados`}
              </p>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-6">
                <div className="text-8xl">🛒</div>
                <p className="text-2xl text-gray-500">Seu carrinho está vazio</p>
                <button
                  onClick={() => setCurrentPage('catalog')}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Começar a Comprar
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lista de Itens */}
                <div className="lg:col-span-2 space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-full md:w-32 h-32 object-cover rounded-xl"
                        />
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <span className="text-2xl font-bold text-pink-600">
                              R$ {item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                >
                                  <MinusIcon className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="font-bold text-lg min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                >
                                  <PlusIcon className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo do Pedido */}
                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-32">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-bold">R$ {getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxa de entrega:</span>
                      <span className="font-bold">R$ 8,00</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total:</span>
                      <span className="font-black text-pink-600">R$ {(getCartTotal() + 8).toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage('checkout')}
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Finalizar Pedido 🎉
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Página de Checkout */}
        {currentPage === 'checkout' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text">
                Finalizar Pedido
              </h2>
              <p className="text-xl text-gray-600 mt-4">
                Preencha seus dados para concluir a compra
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulário */}
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Dados de Entrega</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Endereço completo"
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="CEP"
                      className="p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Cidade"
                      className="p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-800">Forma de Pagamento</h4>
                  <div className="space-y-3">
                    {['Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Dinheiro'].map(method => (
                      <label key={method} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 cursor-pointer transition-colors duration-200">
                        <input type="radio" name="payment" className="text-pink-500" />
                        <span className="font-medium">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h3>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de entrega:</span>
                    <span className="font-bold">R$ 8,00</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-black text-pink-600">R$ {(getCartTotal() + 8).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage('confirmation')
                      setCart([])
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Confirmar Pedido 🎉
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Página Sobre Nós */}
        {currentPage === 'about' && (
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text">
                Sobre a Delícias da Casa
              </h2>
              <p className="text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Uma confeitaria artesanal com mais de 15 anos de tradição em criar momentos doces e especiais
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-neutral-800">Nossa História</h3>
                <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                  <p>
                    Fundada em 2008 pela chef confeiteira Maria Silva, a Delícias da Casa nasceu do sonho de 
                    compartilhar receitas de família que passaram por gerações.
                  </p>
                  <p>
                    Começamos como uma pequena confeitaria de bairro e hoje somos referência em doces artesanais, 
                    mantendo sempre o carinho e a qualidade que nos tornaram especiais.
                  </p>
                  <p>
                    Cada produto é feito com ingredientes selecionados e muito amor, garantindo que cada mordida 
                    seja uma experiência única e inesquecível.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop" 
                  alt="Nossa confeitaria" 
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                <div className="text-center">
                  <h4 className="text-xl font-bold text-neutral-800 mb-2">Chef Maria Silva</h4>
                  <p className="text-neutral-600">Fundadora e Chef Confeiteira</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-bold text-neutral-800 mb-2">Prêmios</h4>
                <p className="text-neutral-600">Melhor Confeitaria Artesanal 2022 e 2023</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-bold text-neutral-800 mb-2">Clientes Felizes</h4>
                <p className="text-neutral-600">Mais de 10.000 clientes satisfeitos</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h4 className="text-xl font-bold text-neutral-800 mb-2">Sustentabilidade</h4>
                <p className="text-neutral-600">Ingredientes orgânicos e locais</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                Criar momentos especiais através de doces artesanais únicos, mantendo a tradição familiar 
                e inovando constantemente para surpreender nossos clientes com sabores inesquecíveis.
              </p>
            </div>
          </div>
        )}

        {/* Página de Contato */}
        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text">
                Entre em Contato
              </h2>
              <p className="text-2xl text-neutral-600">
                Estamos aqui para tornar seus momentos ainda mais doces
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Informações de Contato */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Informações</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800">Endereço</h4>
                        <p className="text-neutral-600">Rua das Delícias, 123 - Centro<br/>São Paulo, SP - CEP: 01234-567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800">Telefone</h4>
                        <p className="text-neutral-600">(11) 9999-8888<br/>WhatsApp: (11) 9999-7777</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✉️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800">E-mail</h4>
                        <p className="text-neutral-600">contato@deliciasdacasa.com.br<br/>pedidos@deliciasdacasa.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🕒</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800">Horário de Funcionamento</h4>
                        <p className="text-neutral-600">Segunda a Sexta: 8h às 18h<br/>Sábado: 8h às 16h<br/>Domingo: 9h às 15h</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">Redes Sociais</h3>
                  <div className="flex space-x-4">
                    <button className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl transition-colors duration-300">
                      📘 Facebook
                    </button>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl transition-colors duration-300">
                      📷 Instagram
                    </button>
                    <button className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-xl transition-colors duration-300">
                      💬 WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">Envie uma Mensagem</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Telefone</label>
                    <input 
                      type="tel" 
                      className="w-full p-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Assunto</label>
                    <select className="w-full p-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none">
                      <option>Pedido Personalizado</option>
                      <option>Dúvidas sobre Produtos</option>
                      <option>Reclamação</option>
                      <option>Sugestão</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Mensagem</label>
                    <textarea 
                      rows="4" 
                      className="w-full p-4 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-400 outline-none resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Enviar Mensagem 📧
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Página de Confirmação */}
        {currentPage === 'confirmation' && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="text-8xl">🎉</div>
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                Pedido Confirmado!
              </h2>
              <p className="text-xl text-gray-600">
                Obrigado pela sua compra! Seu pedido foi recebido e será preparado com muito carinho.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Detalhes do Pedido</h3>
              <div className="text-left space-y-2">
                <p><strong>Número do pedido:</strong> #DLC{Math.floor(Math.random() * 10000)}</p>
                <p><strong>Tempo estimado:</strong> 45-60 minutos</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-bold">Confirmado</span></p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Voltar ao Início
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className="bg-white border-2 border-pink-300 text-pink-600 font-bold py-4 px-8 rounded-2xl text-xl hover:bg-pink-50 transition-all duration-300"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-neutral-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text">
                Delícias da Casa 🍰
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Criando momentos doces e especiais desde 2008 com produtos artesanais de alta qualidade.
              </p>
              <div className="flex space-x-4">
                <button className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                  📘
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors duration-300">
                  📷
                </button>
                <button className="bg-accent-600 hover:bg-accent-700 p-2 rounded-lg transition-colors duration-300">
                  💬
                </button>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Links Rápidos</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Início
                </button>
                <button 
                  onClick={() => setCurrentPage('catalog')}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Catálogo
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Sobre Nós
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="block text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Contato
                </button>
              </div>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Contato</h4>
              <div className="space-y-2 text-neutral-300">
                <p>📍 Rua das Delícias, 123</p>
                <p>São Paulo, SP</p>
                <p>📞 (11) 9999-8888</p>
                <p>✉️ contato@deliciasdacasa.com.br</p>
              </div>
            </div>

            {/* Horário */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Horário de Funcionamento</h4>
              <div className="space-y-2 text-neutral-300">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 16h</p>
                <p>Domingo: 9h às 15h</p>
              </div>
            </div>
          </div>

          <hr className="border-neutral-700 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400">
              © 2024 Delícias da Casa. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-neutral-400">
              <button className="hover:text-primary-400 transition-colors duration-300">
                Política de Privacidade
              </button>
              <button className="hover:text-primary-400 transition-colors duration-300">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
