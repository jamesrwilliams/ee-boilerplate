<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| ExpressionEngine Config Items
|--------------------------------------------------------------------------
|
| The following items are for use with ExpressionEngine.  The rest of
| the config items are for use with CodeIgniter, some of which are not
| observed by ExpressionEngine, e.g. 'permitted_uri_chars'
|
*/
$config['app_version'] = '2.11.2';
$admin_email = '';

$path = 'home/username/';
$public_path = $path.'/public_html';
$url = 'http://'.$_SERVER['HTTP_HOST'];
$assets = $url.'assets';
$config['webmaster_email'] = $admin_email;

$config['third_party_path'] = $path.'/app/addons';
$config['path_third_themes'] = $public_path.'/themes/third_party';
$config['url_third_themes'] = $url.'/themes/third_party';

$config['mime_whitelist_member_group_exception'] = '1, 6';

$config['index_page'] = '';
$config['cp_url'] = $url.'/admin.php';
$config['encryption_key'] = '';
$config['uri_protocol']	= 'AUTO';
$config['log_threshold'] = 1;
$config['log_path'] = $path.'/.logs/';
$config['log_date_format'] = 'Y-m-d H:i:s';
$config['cache_path'] = '';
$config['allow_extensions'] = 'y';
$config['charset'] = 'UTF-8';
$config['rewrite_short_tags'] = FALSE;
$config['subclass_prefix'] = 'EE_';
$config['popup_link'] = 'n';
$config['recount_batch_total'] = '1000';
$config['rte-enabled'] = 'n';
$config['allow_textarea_tabs'] = 'y';
$config['autosave_interval_seconds'] = '30';
$config['autosave_prune_hours'] = '24';
$config['cache_driver_backup'] = 'file';
$config['disable_all_tracking'] = 'n';
$config['disable_csrf_protection'] = 'y';
$config['disable_tag_caching'] = 'n';
$config['expire_session_on_browser_close'] = 'n';
$config['filename_increment'] = 'n';
$config['htaccess_path'] = $url.'/.htaccess';
$config['remove_close_all_button'] = 'n';
$config['remove_unparsed_vars'] = 'n';
$config['spellcheck_language_code'] = 'en';
$config['publish_page_title_focus'] = 'n';


// Global Template Preferences

$config['enable_template_routes'] = 'y';
$config['strict_urls'] = 'n';
$config['save_tmpl_revisions'] = 'n';
$config['max_tmpl_revisions'] = '20';
$config['save_tmpl_files'] = 'y';
$config['tmpl_file_basepath'] = $path.'/app/templates/';
$config['hidden_template_indicator'] = '_';
$config['hidden_template_404'] = 'y';
$config['smart_static_parsing'] = 'y';
$config['template_group'] = 'page';
$config['template'] = 'home';

// Global Channel Preferences

$config['use_category_name'] = 'y';
$config['reserved_category_word'] = 'category';
$config['auto_assign_cat_parents'] = 'y';
$config['new_posts_clear_caches'] = 'y';
$config['enable_sql_caching'] = 'n';
$config['word_separator'] = 'dash';

// General Configuration

$config['is_system_on'] = 'y';
$config['site_index'] = '';
$config['theme_folder_url'] = $url.'/themes/';
$config['theme_folder_path'] = $public_path.'/themes/';
$config['cp_theme'] = 'default';
$config['deft_lang'] = 'english';
$config['xml_lang'] = 'en';
$config['cache_driver'] = 'file';
$config['max_caches'] = '300';
$config['new_version_check'] = 'n';
$config['doc_url'] = 'https://docs.expressionengine.com/v2/';

// Localization Settings

$config['tz_country'] = 'gb';
$config['default_site_timezone'] = 'Europe/London';
$config['date_format'] = '%d/%m/%Y';
$config['time_format'] = '24';
$config['include_seconds'] = 'n';

// Output and Debugging Preferences

$config['send_headers'] = 'y';
$config['gzip_output'] = 'y';
$config['force_query_string'] = 'n';
$config['redirect_method'] = 'redirect';
$config['debug'] = '1';
$config['show_profiler'] = 'n';
$config['template_debugging'] = 'n';

// Image Resizing Preferences

$config['image_resize_protocol'] = 'gd2';
$config['image_library_path'] = '';
$config['thumbnail_prefix'] = 'thumb';

// Emoticon Preferences

$config['enable_emoticons'] = 'n';
$config['emoticon_url'] = $assets.'/smileys/';

// Search Term Log Configuration

$config['enable_search_log'] = 'n';
$config['max_logged_searches'] = '0';

// Security and Session Preferences

$config['cp_session_type'] = 'c';
$config['website_session_type'] = 'c';
$config['deny_duplicate_data'] = 'y';
$config['redirect_submitted_links'] = 'n';
$config['allow_username_change'] = 'y';
$config['allow_multi_logins'] = 'y';
$config['require_ip_for_login'] = 'y';
$config['require_ip_for_posting'] = 'y';
$config['xss_clean_uploads'] = 'y';
$config['password_lockout'] = 'y';
$config['password_lockout_interval'] = '1';
$config['require_secure_passwords'] = 'n';
$config['allow_dictionary_pw'] = 'y';
$config['name_of_dictionary_file'] = '';
$config['un_min_len'] = '4';
$config['pw_min_len'] = '5';

// Cookie Settings

$config['cookie_domain'] = '';
$config['cookie_path'] = '';
$config['cookie_prefix'] = '';
$config['cookie_httponly'] = 'y';
$config['cookie_secure'] = 'n';

// Word Censoring

$config['enable_censoring'] = 'y';
$config['censor_replacement'] = '*';
$config['censored_words'] = 'viagra|cialis';

// Tracking Preferences

$config['enable_online_user_tracking'] = 'n';
$config['enable_hit_tracking'] = 'n';
$config['enable_entry_view_tracking'] = 'n';
$config['max_referrers'] = '0';
$config['dynamic_tracking_disabling'] = '0';
$config['log_referrers'] = 'n';
$config['relaxed_track_views'] = 'n';

// CAPTCHA Preferences

$config['captcha_path'] = $public_path.'/assets/captchas/';
$config['captcha_url'] = $assets.'/captchas/';
$config['captcha_font'] = 'y';
$config['captcha_rand'] = 'n';
$config['captcha_require_members'] = 'n';

// Throttling Configuration

$config['enable_throttling'] = 'n';
$config['banish_masked_ips'] = 'n';
$config['max_page_loads'] = '10';
$config['time_interval'] = '5';
$config['lockout_time'] = '15';
$config['banishment_type'] = 'message';
$config['banishment_url'] = '';
$config['banishment_message'] = 'You have exceeded the allowed page load frequency.';

// Software Registration

$config['license_contact'] = $admin_email;
$config['license_number'] = '4223-4223-4223-4223';

// Member Preferences

$config['allow_member_registration'] = 'y';
$config['req_mbr_activation'] = 'none';
$config['require_terms_of_service'] = 'n';
$config['allow_member_localization'] = 'n';
$config['use_membership_captcha'] = 'n';
$config['default_member_group'] = '5';
$config['member_theme'] = '';
$config['profile_trigger'] = 'm3mb3r';
$config['memberlist_order_by'] = 'join_date';
$config['memberlist_sort_order'] = 'desc';
$config['memberlist_row_limit'] = '30';
$config['new_member_notification'] = 'y';
$config['mbr_notification_emails'] = $admin_email;
$config['prv_msg_max_chars'] = '6000';
$config['prv_msg_html_format'] = 'safe';
$config['prv_msg_auto_links'] = 'n';
$config['prv_msg_upload_path'] = $public_path.'/assets/pm_attachments/';
$config['prv_msg_max_attachments'] = '3';
$config['prv_msg_attach_maxsize'] = '250';
$config['prv_msg_attach_total'] = '100';
$config['prv_msg_throttling_period'] = '10';
$config['prv_msg_waiting_period'] = '1';
$config['enable_avatars'] = 'y';
$config['allow_avatar_uploads'] = 'y';
$config['avatar_url'] = $assets.'/avatars/';
$config['avatar_path'] = $public_path.'/assets/avatars/';
$config['avatar_max_width'] = '100';
$config['avatar_max_height'] = '100';
$config['avatar_max_kb'] = '512';
$config['enable_photos'] = 'y';
$config['photo_url'] = $assets.'/member_photos/';
$config['photo_path'] = $public_path.'/assets/member_photos/';
$config['photo_max_width'] = '100';
$config['photo_max_height'] = '100';
$config['photo_max_kb'] = '1024';
$config['allow_signatures'] = 'y';
$config['sig_maxlength'] = '500';
$config['sig_allow_img_hotlink'] = 'y';
$config['sig_allow_img_upload'] = 'y';
$config['sig_img_url'] = $assets.'/signature_attachments/';
$config['sig_img_path'] = $public_path.'/assets/signature_attachments/';
$config['sig_img_max_width'] = '480';
$config['sig_img_max_height'] = '80';
$config['sig_img_max_kb'] = '1024';

// User Banning

$config['banned_ips'] = '';
$config['banned_emails'] = '';
$config['banned_usernames'] = 'admin|Admin|administrator|Administrator';
$config['banned_screen_names'] = 'admin|Admin|administrator|Administrator';
$config['ban_action'] = 'message';
$config['ban_message'] = 'This site is currently unavailable.';
$config['ban_destination'] = '';

/* End of file config.php */
/* Location: ./system/expressionengine/config/config.php */
