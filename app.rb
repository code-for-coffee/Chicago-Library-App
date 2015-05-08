require 'bundler'
Bundler.require()

get '/' do
  erb :index
end

get '/confirmation' do 
  erb :checkout_confirmation
end

get '/faq' do 
  erb :faq
end