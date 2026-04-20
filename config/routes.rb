Rails.application.routes.draw do
  root 'dashboard#index'

  resources :legal_cases do
    resources :case_documents, only: %i[index create]
    resources :hearings, only: %i[index create update]
  end

  resources :clients
end
