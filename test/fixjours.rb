require 'fixjour'


Fixjour do
  
  define_builder(User) do |klass, overrides|
    klass.new({
    :login=> "user-biatch",
    :email=>"users#{rand}@blah.com",
    :salt=> '7e3041ebc2fc05a40c60028e2c4901a81035d3cd',
    :crypted_password=> '00742970dc9e6319f8019fd54864d3ea740f04b1', # test
    :created_at=> Time.now-4.months,
    })
  end
  
  define_builder(Trip) do |klass, overrides|
    klass.new({
      :starts_on          => (Date.today+2.days),
      :ends_on            => (Date.today+10.days),
      :number_of_days     => 8,
      :number_of_adults   => 1,
      :number_of_children => 0,
      :public             => true,
      :public_url         => '',
      :name               => 'Paris'
    })
  end
  
end


include Fixjour




