Paperclip::Attachment.interpolations[:s3_id] = proc do |attachment, style| 
  return attachment.instance.compatibility_id unless attachment.instance.compatibility_id.nil?
  return attachment.instance.id
end
  

