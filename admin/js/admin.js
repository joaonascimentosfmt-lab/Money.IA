(function() {

  var $ = function(id) { return document.getElementById(id); };

  // ============ STATE ============
  var API_KEY_STORAGE_KEY = 'mone_unsplash_key';

  var editingId = null;
  var currentImageUrl = '';

  // ============ DOM REFS ============
  var apiKeyInput = $('apiKeyInput');
  var saveApiKeyBtn = $('saveApiKeyBtn');
  var apiKeyStatus = $('apiKeyStatus');
  var productsTableBody = $('productsTableBody');
  var addProductBtn = $('addProductBtn');
  var adminEmpty = $('adminEmpty');
  var productModal = $('productModal');
  var modalTitle = $('modalTitle');
  var modalClose = $('modalClose');
  var modalCancel = $('modalCancel');
  var modalSave = $('modalSave');
  var fieldName = $('fieldName');
  var fieldCategory = $('fieldCategory');
  var fieldBrand = $('fieldBrand');
  var fieldDesc = $('fieldDesc');
  var fieldVolume = $('fieldVolume');
  var fieldPrice = $('fieldPrice');
  var fieldTags = $('fieldTags');
  var fieldImageUrl = $('fieldImageUrl');
  var imagePreview = $('imagePreview');
  var imageResult = $('imageResult');
  var imageResultImg = $('imageResultImg');
  var imageLoading = $('imageLoading');
  var imageArea = $('imageArea');
  var imageRefreshBtn = $('imageRefreshBtn');
  var confirmModal = $('confirmModal');
  var confirmYes = $('confirmYes');
  var confirmNo = $('confirmNo');
  var searchTimeout = null;

  // ============ API KEY ============
  function loadApiKey() {
    var key = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (key) {
      apiKeyInput.value = key;
      apiKeyStatus.textContent = 'Chave configurada.';
      apiKeyStatus.className = 'admin-config-status ok';
    }
  }

  saveApiKeyBtn.addEventListener('click', function() {
    var key = apiKeyInput.value.trim();
    if (!key) {
      apiKeyStatus.textContent = 'Insira uma chave valida.';
      apiKeyStatus.className = 'admin-config-status err';
      return;
    }
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    apiKeyStatus.textContent = 'Chave salva com sucesso!';
    apiKeyStatus.className = 'admin-config-status ok';
  });

  // Helper - category label lookup (since site.js is not loaded here)
  function getCategoryLabel(category) {
    var found = CATEGORIES.find(function(c) { return c.id === category; });
    return found ? found.label : category;
  }

  // ============ UNSPLASH IMAGE SEARCH ============
  function getApiKey() {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  }

  function searchProductImage(query) {
    var apiKey = getApiKey();
    if (!apiKey) {
      return Promise.reject(new Error('API key nao configurada'));
    }
    var url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(query) + '&per_page=3&client_id=' + apiKey;
    return fetch(url)
      .then(function(res) {
        if (!res.ok) throw new Error('Erro na API: ' + res.status);
        return res.json();
      })
      .then(function(data) {
        if (data.results && data.results.length > 0) {
          return {
            url: data.results[0].urls.small,
            author: data.results[0].user.name,
            unsplashUrl: data.results[0].links.html
          };
        }
        return null;
      });
  }

  function performImageSearch(query) {
    var previousUrl = currentImageUrl;
    imagePreview.classList.add('hidden');
    imageResult.classList.add('hidden');
    imageLoading.classList.remove('hidden');
    imageArea.classList.remove('has-image');

    searchProductImage(query).then(function(result) {
      imageLoading.classList.add('hidden');
      if (result) {
        currentImageUrl = result.url;
        fieldImageUrl.value = result.url;
        imageResultImg.src = result.url;
        imageResult.classList.remove('hidden');
        imageArea.classList.add('has-image');
      } else {
        currentImageUrl = previousUrl || '';
        imagePreview.classList.remove('hidden');
        imagePreview.innerHTML = previousUrl
          ? '<p>Nova imagem nao encontrada.<br>A imagem anterior sera mantida.</p>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
            '<p>Nenhuma imagem encontrada.<br>O placeholder SVG sera usado.</p>';
      }
    }).catch(function(err) {
      currentImageUrl = previousUrl || '';
      imageLoading.classList.add('hidden');
      imagePreview.classList.remove('hidden');
      var msg = (err.message === 'API key nao configurada')
        ? 'API key nao configurada.<br>Configure acima para buscar imagens automaticamente.'
        : 'Erro ao buscar imagem: ' + err.message;
      if (previousUrl) {
        imagePreview.innerHTML = '<p>' + msg + '<br>A imagem anterior sera mantida.</p>';
      } else {
        imagePreview.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
          '<p>' + msg + '<br>O placeholder sera usado.</p>';
      }
    });
  }

  // Auto search on name field change
  fieldName.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    var name = fieldName.value.trim();
    if (name.length < 3) return;
    searchTimeout = setTimeout(function() {
      performImageSearch(name);
    }, 800);
  });

  imageRefreshBtn.addEventListener('click', function() {
    var name = fieldName.value.trim();
    if (name) performImageSearch(name);
  });

  // ============ BATCH IMAGE SEARCH ============
  var batchSearchBtn = $('batchSearchBtn');
  var batchProgress = $('batchProgress');
  var batchBarFill = $('batchBarFill');
  var batchStatus = $('batchStatus');
  var isBatchRunning = false;

  batchSearchBtn.addEventListener('click', function() {
    if (isBatchRunning) return;
    var apiKey = getApiKey();
    if (!apiKey) {
      showToast('Configure a Unsplash API key primeiro.');
      return;
    }
    runBatchSearch();
  });

  function runBatchSearch() {
    isBatchRunning = true;
    batchSearchBtn.disabled = true;
    batchProgress.classList.remove('hidden');
    batchBarFill.style.width = '0%';
    batchStatus.textContent = 'Preparando...';

    var allProducts = getAllProducts();
    var custom = getCustomProducts();
    var total = allProducts.length;
    var processed = 0;
    var found = 0;

    function processNext(index) {
      if (index >= total) {
        batchStatus.textContent = 'Concluido! ' + found + ' de ' + total + ' imagens encontradas.';
        batchBarFill.style.width = '100%';
        isBatchRunning = false;
        batchSearchBtn.disabled = false;
        renderTable();
        showToast('Busca em lote concluida!');
        return;
      }

      var product = allProducts[index];
      var customIndex = custom.findIndex(function(c) { return c.id === product.id; });
      var existing = customIndex !== -1 ? custom[customIndex] : null;

      // Skip if already has an image
      if (existing && existing.imageUrl) {
        batchStatus.textContent = '[' + (index + 1) + '/' + total + '] ' + product.name + ' (ja possui imagem)';
        batchBarFill.style.width = ((processed + 1) / total * 100) + '%';
        processed++;
        setTimeout(function() { processNext(index + 1); }, 100);
        return;
      }

      batchStatus.textContent = '[' + (index + 1) + '/' + total + '] Buscando imagem para: ' + product.name + '...';

      searchProductImage(product.name + ' ' + product.brand).then(function(result) {
        processed++;
        if (result) {
          found++;
          var entry = existing || Object.assign({}, product, { id: product.id });
          entry.imageUrl = result.url;
          if (customIndex !== -1) {
            custom[customIndex] = entry;
          } else {
            custom.push(entry);
          }
          saveCustomProducts(custom);
        }
        batchBarFill.style.width = (processed / total * 100) + '%';
        batchStatus.textContent = '[' + (index + 1) + '/' + total + '] ' + product.name + (result ? ' - Imagem encontrada!' : ' - Sem imagem');
        setTimeout(function() { processNext(index + 1); }, 1200); // Rate limit: 1.2s between requests
      }).catch(function(err) {
        processed++;
        batchBarFill.style.width = (processed / total * 100) + '%';
        batchStatus.textContent = '[' + (index + 1) + '/' + total + '] ' + product.name + ' - Erro: ' + err.message;
        setTimeout(function() { processNext(index + 1); }, 1200);
      });
    }

    processNext(0);
  }

  // ============ RENDER TABLE ============
  function renderTable() {
    var custom = getCustomProducts();
    var all = getAllProducts();

    productsTableBody.innerHTML = '';
    adminEmpty.classList.toggle('hidden', custom.length > 0);

    all.forEach(function(p) {
      var isCustom = custom.some(function(c) { return c.id === p.id; });
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><div class="admin-table-img">' + (p.imageUrl
          ? '<img src="' + p.imageUrl + '" alt="' + p.name + '">'
          : getProductImage(p)) + '</div></td>' +
        '<td style="font-size:11px;color:var(--gray-dark)">' + p.id + '</td>' +
        '<td><strong>' + p.name + '</strong></td>' +
        '<td>' + getCategoryLabel(p.category) + '</td>' +
        '<td style="color:var(--gold);font-weight:600">R$ ' + p.price.toFixed(2) + '</td>' +
        '<td><span class="admin-table-badge ' + (isCustom ? 'custom' : 'hardcoded') + '">' + (isCustom ? 'Personalizado' : 'Original') + '</span></td>' +
        '<td>' +
          (isCustom
            ? '<div class="admin-table-actions">' +
                '<button class="btn-edit" data-id="' + p.id + '" title="Editar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
                '<button class="btn-delete" data-id="' + p.id + '" title="Excluir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
              '</div>'
            : '<span style="color:var(--gray-dark);font-size:11px">—</span>'
          ) +
        '</td>';

      productsTableBody.appendChild(tr);

      if (isCustom) {
        tr.querySelector('.btn-edit').addEventListener('click', function() {
          openEditModal(p.id);
        });
        tr.querySelector('.btn-delete').addEventListener('click', function() {
          confirmDelete(p.id);
        });
      }
    });
  }

  // ============ MODAL ============
  function openModal() {
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    productModal.classList.add('hidden');
    document.body.style.overflow = '';
    resetForm();
  }

  function resetForm() {
    editingId = null;
    currentImageUrl = '';
    fieldName.value = '';
    fieldBrand.value = '';
    fieldDesc.value = '';
    fieldVolume.value = '';
    fieldPrice.value = '';
    fieldTags.value = '';
    fieldImageUrl.value = '';
    imageResult.classList.add('hidden');
    imageLoading.classList.add('hidden');
    imageArea.classList.remove('has-image');
    imagePreview.classList.remove('hidden');
    imagePreview.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
      '<p>A imagem sera buscada automaticamente<br>ao preencher o nome do produto</p>';
    modalTitle.textContent = 'Novo Produto';
  }

  function openEditModal(id) {
    var custom = getCustomProducts();
    var prod = custom.find(function(p) { return p.id === id; });
    if (!prod) return;

    editingId = id;
    modalTitle.textContent = 'Editar Produto';
    fieldName.value = prod.name;
    fieldBrand.value = prod.brand || '';
    fieldDesc.value = prod.description || '';
    fieldVolume.value = prod.volume || '';
    fieldPrice.value = prod.price || '';
    fieldTags.value = (prod.tags || []).join(', ');
    fieldImageUrl.value = prod.imageUrl || '';
    fieldCategory.value = prod.category;
    fieldName.dispatchEvent(new Event('input', { bubbles: true }));
    openModal();

    if (prod.imageUrl) {
      currentImageUrl = prod.imageUrl;
      imagePreview.classList.add('hidden');
      imageLoading.classList.add('hidden');
      imageResult.classList.remove('hidden');
      imageResultImg.src = prod.imageUrl;
      imageArea.classList.add('has-image');
    }
  }

  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);
  productModal.addEventListener('click', function(e) {
    if (e.target === productModal) closeModal();
  });

  // ============ CRUD ============
  function generateId() {
    return 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
  }

  function saveProduct() {
    var name = fieldName.value.trim();
    var category = fieldCategory.value;
    var brand = fieldBrand.value.trim();
    var desc = fieldDesc.value.trim();
    var volume = fieldVolume.value.trim();
    var price = parseFloat(fieldPrice.value);
    var tagsStr = fieldTags.value.trim();

    if (!name) { showToast('Preencha o nome do produto.'); return; }
    if (!category) { showToast('Selecione uma categoria.'); return; }
    if (isNaN(price) || price <= 0) { showToast('Preco invalido.'); return; }

    var tags = tagsStr ? tagsStr.split(',').map(function(t) { return t.trim().toLowerCase(); }).filter(Boolean) : [];

    var product = {
      id: editingId || generateId(),
      name: name,
      category: category,
      brand: brand || 'Generic',
      description: desc || name,
      volume: volume || 'Unidade',
      price: price,
      imageUrl: currentImageUrl || '',
      available: true,
      tags: tags,
      inChat: true
    };

    var custom = getCustomProducts();

    if (editingId) {
      var idx = custom.findIndex(function(p) { return p.id === editingId; });
      if (idx !== -1) {
        custom[idx] = product;
      }
    } else {
      custom.push(product);
    }

    saveCustomProducts(custom);
    closeModal();
    renderTable();
    showToast(editingId ? 'Produto atualizado!' : 'Produto cadastrado com sucesso!');
  }

  modalSave.addEventListener('click', saveProduct);

  // Enter key in price field triggers save
  fieldPrice.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveProduct();
    }
  });

  var deleteTargetId = null;

  function confirmDelete(id) {
    deleteTargetId = id;
    confirmModal.classList.remove('hidden');
  }

  confirmYes.addEventListener('click', function() {
    if (deleteTargetId) {
      var custom = getCustomProducts();
      custom = custom.filter(function(p) { return p.id !== deleteTargetId; });
      saveCustomProducts(custom);
      deleteTargetId = null;
      confirmModal.classList.add('hidden');
      renderTable();
      showToast('Produto excluido.');
    }
  });

  confirmNo.addEventListener('click', function() {
    deleteTargetId = null;
    confirmModal.classList.add('hidden');
  });

  confirmModal.addEventListener('click', function(e) {
    if (e.target === confirmModal) {
      deleteTargetId = null;
      confirmModal.classList.add('hidden');
    }
  });

  // ============ TOAST ============
  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'toast-msg';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 2200);
  }

  // ============ CATEGORY SELECT ============
  function populateCategories() {
    fieldCategory.innerHTML = '<option value="">Selecione...</option>';
    CATEGORIES.forEach(function(cat) {
      if (cat.id === 'all') return;
      var opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.label;
      fieldCategory.appendChild(opt);
    });
  }

  // ============ INIT ============
  loadApiKey();
  populateCategories();
  renderTable();
  addProductBtn.addEventListener('click', function() {
    resetForm();
    openModal();
  });

  // Listen for storage changes from other tabs
  window.addEventListener('storage', function(e) {
    if (e.key === CUSTOM_PRODUCTS_KEY) {
      renderTable();
    }
  });

})();
