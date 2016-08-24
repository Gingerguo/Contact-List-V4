# Homepage (Root path)
get '/' do
  @contacts = Contact.all
  erb :index
end

get '/show' do
  content_type :json
  Contact.all.to_json
end

get '/show/:id' do
  @contact = Contact.find params[:id]
  erb :"/"
end

post '/create' do
  @contact = Contact.new(
   firname: params[:firstname],
   lasname: params[:lastname],
   email: params[:email]
   )
  @contact.save
  redirect '/'
end

post '/edit' do
  @contact = Contact.find(params[:contact_id])
  @contact.firname = params[:firstname]
  @contact.lasname = params[:lastname]
  @contact.email = params[:email]
  @contact.save
  content_type :json
  Contact.all.to_json

end

post '/delete' do

end
