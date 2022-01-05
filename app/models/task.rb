class Task < ApplicationRecord
  validates :description, presence: true

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  accepts_nested_attributes_for :tags

  scope :simple_search, ->(description) {
    where("LOWER(description) LIKE LOWER(?)", "%" + description + "%")
  }

  scope :filter_priority, ->(priority) {  
    if priority == "" || priority == "Low Priority" || priority == "Medium Priority" || priority == "High Priority"
      where("priority = ?", priority)
    end
  }

  scope :sort_value, ->(sort_value) {
    if sort_value == "ascending"
      reorder(description: :asc)
    elsif sort_value == "descending"
      reorder(description: :desc)
    else
      reorder(deadline: :asc, description: :asc)
    end
  }

  scope :filter_tags, ->(tag_list) {
    tag_names = tag_list.split(",")
    joins(:tags).where(tags: { name: tag_names }).distinct if tag_names.length > 0

  }

  scope :search, ->(description, priority, sort_value, tag_list) {
    simple_search(description).filter_priority(priority).sort_value(sort_value).filter_tags(tag_list)
  }

  scope :today, -> { where(deadline: Time.now) }

  scope :tomorrow, -> { where(deadline: Time.now + 1.day) }

end
