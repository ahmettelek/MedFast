-- TEMİZLİK
DROP TABLE IF EXISTS prescriptions CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;

-- 1. Profile
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT,
  tc_no TEXT,
  phone TEXT,
  email TEXT,
  blood_type TEXT
);

-- 2. Departments
CREATE TABLE IF NOT EXISTS departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT
);

INSERT INTO departments (name, icon, description) VALUES
('Dahiliye', 'Stethoscope', 'İç hastalıkları, sindirim sistemi, diyabet ve tansiyon.'),
('Göz Hastalıkları', 'Eye', 'Göz muayenesi, katarakt ve lazer tedavileri.'),
('Kardiyoloji', 'Heart', 'Kalp sağlığı ve damar hastalıkları.'),
('Ortopedi', 'Bone', 'Kas ve iskelet sistemi hastalıkları.'),
('Cildiye', 'Activity', 'Deri, saç ve tırnak hastalıkları.'),
('Nöroloji', 'Brain', 'Beyin ve sinir sistemi hastalıkları.'),
('Çocuk Sağlığı', 'Baby', '0-18 yaş arası çocuk sağlığı.'),
('Diş Hekimliği', 'Smile', 'Ağız ve diş sağlığı.'),
('Kulak Burun Boğaz', 'Ear', 'KBB hastalıkları.'),
('Psikiyatri', 'MessageCircle', 'Ruh sağlığı ve danışmanlık.');

-- 3. Doctors
CREATE TABLE IF NOT EXISTS doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  rating NUMERIC,
  years_of_experience INT,
  image_url TEXT,
  about TEXT,
  is_active BOOLEAN DEFAULT true
);

DO $$
DECLARE
  d_dahiliye UUID; d_goz UUID; d_kardiyo UUID; d_ortopedi UUID; d_cildiye UUID;
  d_noroloji UUID; d_cocuk UUID; d_dis UUID; d_kbb UUID; d_psiko UUID;
BEGIN
  SELECT id INTO d_dahiliye FROM departments WHERE name = 'Dahiliye';
  SELECT id INTO d_goz FROM departments WHERE name = 'Göz Hastalıkları';
  SELECT id INTO d_kardiyo FROM departments WHERE name = 'Kardiyoloji';
  SELECT id INTO d_ortopedi FROM departments WHERE name = 'Ortopedi';
  SELECT id INTO d_cildiye FROM departments WHERE name = 'Cildiye';
  SELECT id INTO d_noroloji FROM departments WHERE name = 'Nöroloji';
  SELECT id INTO d_cocuk FROM departments WHERE name = 'Çocuk Sağlığı';
  SELECT id INTO d_dis FROM departments WHERE name = 'Diş Hekimliği';
  SELECT id INTO d_kbb FROM departments WHERE name = 'Kulak Burun Boğaz';
  SELECT id INTO d_psiko FROM departments WHERE name = 'Psikiyatri';

  -- 1. DAHİLİYE (2M, 1F)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Uzm. Dr. Ahmet Yıldırım', 'Kıdemli Dahiliye Uzmanı', d_dahiliye, 5.0, 25, 'https://st4.depositphotos.com/1325771/39154/i/450/depositphotos_391545206-stock-photo-happy-male-medical-doctor-portrait.jpg', 'Diyabet ve metabolizma uzmanı.', true),
  ('Dr. Mehmet Can', 'Dahiliye Uzmanı', d_dahiliye, 4.5, 12, 'https://st3.depositphotos.com/1177973/13224/i/450/depositphotos_132246354-stock-photo-young-male-doctor-with-tablet.jpg', 'Hipertansiyon ve böbrek hastalıkları.', true),
  ('Dr. Ayşe Yılmaz', 'Genel Dahiliye', d_dahiliye, 4.8, 8, 'https://doktorum.com.tr/wp-content/uploads/2025/07/doktor-sitesi.jpg', 'Check-up ve koruyucu hekimlik.', false);

  -- 2. GÖZ (2F, 1M)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Op. Dr. Elif Demir', 'Göz Cerrahı', d_goz, 4.9, 18, 'https://marketplace.canva.com/MADBPFO-M2o/1/thumbnail_large-1/canva-female-doctor-MADBPFO-M2o.jpg', 'Retina cerrahisi ve glokom tedavisi.', true),
  ('Dr. Zeynep Kaya', 'Göz Hastalıkları', d_goz, 4.3, 6, 'https://thumbs.dreamstime.com/b/doktor-10501709.jpg', 'Çocuk göz sağlığı ve kırma kusurları.', true),
  ('Dr. Ali Kılıç', 'Göz Asistanı', d_goz, 4.0, 3, 'https://st3.depositphotos.com/10654668/13844/i/450/depositphotos_138445770-stock-photo-male-doctor-in-hospital.jpg', 'Genel göz muayenesi ve katarakt.', true);

  -- 3. KARDİYOLOJİ (2M, 1F)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Prof. Dr. Burak Özdemir', 'Girişimsel Kardiyoloji', d_kardiyo, 5.0, 30, 'https://img.freepik.com/fotos-kostenlos/portraet-eines-laechelnden-arztes_171337-1532.jpg?semt=ais_hybrid&w=740&q=80', 'Anjiyo ve stent uygulamaları.', true),
  ('Doç. Dr. Emre Kurt', 'Kardiyoloji', d_kardiyo, 4.7, 15, 'https://img.freepik.com/fotos-premium/um-medico-sorrindo-para-a-camera_946209-7764.jpg', 'Kalp yetmezliği ve kapak hastalıkları.', false),
  ('Dr. Merve Şahin', 'Kardiyoloji Uzmanı', d_kardiyo, 4.5, 9, 'https://media.istockphoto.com/id/1861987838/tr/foto%C4%9Fraf/smiling-female-doctor-looking-at-camera-in-the-medical-consultation.jpg?s=612x612&w=0&k=20&c=lOZRuTLegTmHdQ0ORrHg2ovmyLyie6kjvXZVMEhocR4=', 'Hipertansiyon ve kalp ritim bozuklukları.', true);

  -- 4. ORTOPEDİ (2F, 1M)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Op. Dr. Esra Çelik', 'Ortopedi Uzmanı', d_ortopedi, 4.8, 14, 'https://cdnuploads.aa.com.tr/uploads/Contents/2025/03/06/thumbs_b_c_d2c36906451cb6c55d9a59f63c7b139e.jpg?v=123230', 'Çocuk ortopedisi ve kalça çıkığı.', true),
  ('Dr. Kübra Arslan', 'Fizik Tedavi', d_ortopedi, 4.4, 7, 'https://www.shutterstock.com/image-photo/happy-successful-doctor-woman-standing-600nw-2664143897.jpg', 'Spor yaralanmaları ve rehabilitasyon.', true),
  ('Prof. Dr. Onur Aslan', 'Ortopedi Cerrahı', d_ortopedi, 4.9, 22, 'https://cdn.pixabay.com/photo/2024/03/25/18/35/ai-generated-8655320_1280.png', 'Protez cerrahisi ve omurga sağlığı.', true);

  -- 5. CİLDİYE (2M, 1F)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Uzm. Dr. Serkan Acar', 'Dermatoloji', d_cildiye, 4.6, 11, 'https://www.kuveytturk.com.tr/medium/SitemapNodePage-FirstImage-22806-2x.vsf', 'Sedef hastalığı ve egzama tedavisi.', true),
  ('Dr. Yusuf Doğan', 'Estetik Dermatoloji', d_cildiye, 4.5, 8, 'https://www.dunyamhastanesi.com/images/doktorlar/suat-altmisyedioglu.webp', 'Lazer tedavileri ve dolgu uygulamaları.', true),
  ('Dr. Fatma Koç', 'Deri Hastalıkları', d_cildiye, 4.7, 10, 'https://st.depositphotos.com/1594308/2118/i/450/depositphotos_21186783-stock-photo-medical-worker.jpg', 'Akne tedavisi ve cilt kanseri taraması.', false);

  -- 6. NÖROLOJİ (2F, 1M)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Prof. Dr. Buse Aydın', 'Nöroloji', d_noroloji, 5.0, 26, 'https://st.depositphotos.com/3280405/4474/i/450/depositphotos_44743405-stock-photo-young-female-doctor.jpg', 'Alzheimer ve demans hastalıkları.', true),
  ('Dr. Sude Öztürk', 'Nöroloji Uzmanı', d_noroloji, 4.6, 12, 'https://st2.depositphotos.com/3200101/6057/i/450/depositphotos_60575315-stock-photo-portrait-of-young-woman-doctor.jpg', 'Migren ve baş ağrısı tedavisi.', true),
  ('Dr. Furkan Çetin', 'Nörolog', d_noroloji, 4.2, 5, 'https://st.depositphotos.com/2389277/5131/i/450/depositphotos_51317187-stock-photo-young-doctor-at-work.jpg', 'Epilepsi ve uyku bozuklukları.', true);

  -- 7. ÇOCUK SAĞLIĞI (2M, 1F)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Uzm. Dr. Oğuzhan Eren', 'Pediatri', d_cocuk, 4.8, 16, 'https://st5.depositphotos.com/4218696/65905/i/450/depositphotos_659057172-stock-photo-friendly-smiling-handsome-grey-haired.jpg', 'Çocuk enfeksiyon hastalıkları.', true),
  ('Dr. Berkay Uslu', 'Çocuk Doktoru', d_cocuk, 4.4, 7, 'https://img.freepik.com/premium-fotograf/yakisikli-doktor-portresi_488220-58123.jpg', 'Çocuk gelişimi ve beslenme takibi.', false),
  ('Dr. Hande Yıldız', 'Yenidoğan Uzmanı', d_cocuk, 4.7, 13, 'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909652-stock-photo-young-doctor-sitting-on-a.jpg', 'Bebek beslenmesi ve aşı takibi.', true);

  -- 8. DİŞ HEKİMLİĞİ (2F, 1M)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Dr. Ceren Polat', 'Ortodontist', d_dis, 4.9, 15, 'https://st4.depositphotos.com/2024219/24708/i/450/depositphotos_247083628-stock-photo-young-nurse-thinking-idea-while.jpg', 'Diş teli ve gülüş tasarımı.', true),
  ('Dr. Derya Korkmaz', 'Pedodontist', d_dis, 4.6, 9, 'https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg', 'Çocuk diş sağlığı ve tedavileri.', true),
  ('Dr. Hakan Taş', 'Çene Cerrahı', d_dis, 4.8, 20, 'https://st4.depositphotos.com/12985790/21800/i/450/depositphotos_218007348-stock-photo-happy-male-doctor-stethoscope-neck.jpg', 'İmplant ve çene cerrahisi.', true);

  -- 9. KBB (2M, 1F)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Op. Dr. Volkan Özer', 'KBB Uzmanı', d_kbb, 4.7, 14, 'https://png.pngtree.com/png-vector/20241115/ourmid/pngtree-handsome-male-doctor-posing-photo-smiling-png-image_14423112.png', 'Burun estetiği ve sinüzit cerrahisi.', true),
  ('Dr. Mustafa Demirel', 'KBB', d_kbb, 4.3, 6, 'https://st4.depositphotos.com/4431055/20763/i/450/depositphotos_207635924-stock-photo-male-doctor-with-stethoscope.jpg', 'İşitme kaybı ve kulak hastalıkları.', true),
  ('Dr. İrem Güneş', 'KBB Asistanı', d_kbb, 4.1, 3, 'https://media.istockphoto.com/id/1189304032/tr/foto%C4%9Fraf/doktor-toplant%C4%B1-odas%C4%B1nda-dijital-tablet-tutuyor.jpg?s=612x612&w=0&k=20&c=9IJMFRNWyR2H6GRD9skEw9hw5wWFRaWNTPbUR_xMDpc=', 'Genel KBB muayenesi ve alerji.', true);

  -- 10. PSİKİYATRİ (2F, 1M)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about, is_active) VALUES
  ('Prof. Dr. Melis Karaca', 'Psikiyatrist', d_psiko, 5.0, 28, 'https://img.pikbest.com/origin/10/10/57/22RpIkbEsTIr4.jpg!sw800', 'Depresyon ve kaygı bozuklukları.', true),
  ('Dr. Nisa Aksoy', 'Klinik Psikolog', d_psiko, 4.7, 10, 'https://media.istockphoto.com/id/2153805399/tr/foto%C4%9Fraf/portrait-of-happy-female-doctor-standing-outside-at-front-of-modern-hospital.jpg?s=612x612&w=0&k=20&c=aSDrRhKLxchPcLihWJOP2AaYzhO1tBVCRbLDswI35W0=', 'Aile terapisi ve child psikolojisi.', false),
  ('Dr. Tolga Kaan', 'Psikiyatri Uzmanı', d_psiko, 4.5, 8, 'https://cdn.create.vista.com/api/media/small/652234668/stock-photo-confused-thoughtful-doctor-isolated-male-doctor-scratching-his-head-isolated', 'Kaygı bozukluğu ve panik atak.', true);

END $$;

-- 4. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT
);

INSERT INTO faqs (question, answer, category) VALUES
('Randevumu nasıl iptal edebilirim?','Randevularım sayfasından "İptal Et" butonuna tıklayın.','Randevu'),
('Muayene ücretleri ne kadar?','Ücretler doktorun unvanına göre değişir.','Ücretlendirme'),
('SGK geçerli mi?','Evet, SGK kabul edilmektedir.','Genel'),
('Online görüşme yapabilir miyim?','Şu an sadece fiziksel muayene hizmeti vermekteyiz.','Hizmetler');

-- 5. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'appointment', 'result', 'prescription', 'reminder', 'system'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
