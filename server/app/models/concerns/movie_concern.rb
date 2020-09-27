module MovieConcern
  extend ActiveSupport::Concern
  # Roman Number implementation
  # Reference: https://rosettacode.org/wiki/Roman_numerals/Encode#Ruby
  def roman(year)
    symbols = { 1=>'I', 5=>'V', 10=>'X', 50=>'L', 100=>'C', 500=>'D', 1000=>'M' }
    subtractors = [ [1000, 100], [500, 100], [100, 10], [50, 10], [10, 1], [5, 1], [1, 0] ]
    return symbols[year] if symbols.has_key?(year)
    subtractors.each do |cutPoint, subtractor|
      return roman(cutPoint) + roman(year - cutPoint)      if year >  cutPoint
      return roman(subtractor) + roman(year + subtractor)  if year >= cutPoint - subtractor and year < cutPoint
    end
  end
end
