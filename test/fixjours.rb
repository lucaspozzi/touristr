require 'fixjour'


Fixjour do
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




