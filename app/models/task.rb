class Task < ApplicationRecord
  validates :description, presence: true

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

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

  scope :due_date, ->(due_date) {
    if due_date == "today"
      where(deadline: Date.today)
    elsif due_date == "tomorrow"
      where(deadline: Date.today + 1)
    elsif due_date == "this_week"
      where(deadline: Date.today..1.week.from_now)
    elsif due_date == "2_weeks"
      where(deadline: (Date.today + 7)..2.week.from_now)
    elsif due_date == "month"
      where(deadline: (1.month.from_now - 1.week)..1.month.from_now)
    elsif due_date == "overdue"
      where("deadline < ?", Date.today)
    else
    end
  }

  scope :filter_tags, ->(tag_list) {
    tag_names = tag_list.split(",")
    joins(:tags).where(tags: { name: tag_list }).distinct if tag_list.length > 0
  }

  scope :search, ->(description, priority, sort_value, due_date, tag_list) {
    simple_search(description).filter_priority(priority).sort_value(sort_value).due_date(due_date).filter_tags(tag_list)
  }

end
