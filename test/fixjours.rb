require 'fixjour'


Fixjour do
  
  define_builder(User) do |klass, overrides|
    klass.new({
    :login=> "user-biatch#{counter}",
    :email=>"users#{counter}@blah.com",
    :salt=> '7e3041ebc2fc05a40c60028e2c4901a81035d3cd',
    :crypted_password=> '00742970dc9e6319f8019fd54864d3ea740f04b1', # test
    :created_at=> Time.now-4.months,
    :person=>create_person
    })
  end
  
  define_builder(Trip) do |klass, overrides|
    klass.new({
      :starts_on          => (Date.today+2.days),
      :ends_on            => (Date.today+10.days),
      :number_of_days     => 8,
      :number_of_adults   => 1,
      :number_of_children => 0,
      :public             => false,
      :name               => 'Paris'
    })
  end
  
  define_builder(Hotel) do |klass, overrides|
    klass.new({
      :name=>"Hotel#{counter}",
      :latitude=>43.294199891388416,
      :longitude=>5.374319739639759
    })
  end
    
  define_builder(Todo) do |klass, overrides|
    klass.new({
      :title=>"title #{counter}",
      :description=>"blah\nblah\nblah"
    })
  end
  
  define_builder(Person) do |klass, overrides|
    klass.new({
      :email=>"jan@touristr#{counter}.com"
    })
  end
  
  
  define_builder(Destination) do |klass, overrides|
    klass.new({
      :id                => 1234,
      :name              => 'Paris',
      :ascii_name        => 'Paris',
      :alternate_names   => 'Lungsod ng Paris,Lutece,Lutetia Parisorum,PAR,Paarys,Paname,Pantruche,Paraeis,Paras,Pari,Paries,Pariggi,Parigi,Pariis,Pariisi,Parijs,Paris,Paris - Paris,Parisi,Pariz,Parize,Parizh,Parizo,Parizs,Parys,Paryz,Paryzh,Paryzius,Paryż,Paryžius,Paräis,París',
      :lng               => 2.3488000000,
      :lat               => 48.8534100000,
      :feature_class     => 'P',
      :feature_code      => 'PPLC',
      :region_name       => 'Île-de-France',
      :country_code      => 'FR',
      :cc2               => '',
      :admin1_code       => 'A8',
      :admin2_code       => '75',
      :admin3_code       => '751',
      :admin4_code       => '75056',
      :population        => 2138551,
      :elevation         => 0,
      :gtopo30           => 30,
      :time_zone         => 'Europe/Paris',
      :modification_date => '2008-08-27',
      :click_counter     => 0,
      :score             => 431350
    })
  end
  
  define_builder(DestinationContent) do |klass, overrides|
    klass.new({
      :introduction      => "This is the introduction",
      :overview          => "An overview",
      :attractions       => "That's what you must to do there!", 
      :destination_id    => overrides[:destination_id]
    })
  end 

end
include Fixjour



class Test::Unit::TestCase
  def create_destination_country overrides = {}
    create_destination( {:name=>'France', :ascii_name=>'France', :feature_class=>'A', :feature_code=>'PCLI', :alternate_names=>''}.merge(overrides))
  end
  def create_destination_attraction overrides = {}
    create_destination( {:name=>'Euro Disney', :ascii_name=>'Euro Disney', :feature_class=>'L', :feature_code=>'AMUS', :alternate_names=>''}.merge(overrides))
  end

  def create_destination_attraction_with_content overrides = {}
    attrac = create_destination_attraction overrides = {}
    attrac.destination_content = create_destination_content
    attrac
  end
end

