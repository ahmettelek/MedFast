-- MEVCUT DOKTORLARI TEMİZLE
DELETE FROM doctors;

DO $$
DECLARE
  d_dahiliye UUID; d_goz UUID; d_kardiyo UUID; d_ortopedi UUID; d_cildiye UUID;
  d_noroloji UUID; d_cocuk UUID; d_dis UUID; d_kbb UUID; d_psiko UUID;
BEGIN
  -- Departman IDlerini bul
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

  -- 1. DAHİLİYE (2 Erkek, 1 Kadın)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Uzm. Dr. Ahmet Yıldırım', 'Kıdemli Dahiliye Uzmanı', d_dahiliye, 5.0, 25, 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&w=300', 'Diyabet ve metabolizma hastalıkları.'), -- M (Pexels ID: 2182979)
  ('Dr. Mehmet Can', 'Dahiliye Uzmanı', d_dahiliye, 4.5, 12, 'https://images.pexels.com/photos/8960907/pexels-photo-8960907.jpeg?auto=compress&cs=tinysrgb&w=300', 'Hipertansiyon ve böbrek hastalıkları.'), -- M (Pexels ID: 8960907)
  ('Dr. Ayşe Yılmaz', 'Genel Dahiliye', d_dahiliye, 4.8, 8, 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300', 'Check-up ve önleyici tıp.'); -- F (Pexels ID: 4173251)

  -- 2. GÖZ (2 Kadın, 1 Erkek)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Op. Dr. Elif Demir', 'Göz Cerrahı', d_goz, 4.9, 18, 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300', 'Lazer cerrahisi ve retina.'), -- F (Pexels ID: 5215024)
  ('Dr. Zeynep Kaya', 'Göz Hastalıkları', d_goz, 4.3, 6, 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300', 'Çocuk göz sağlığı.'), -- F (Pexels ID: 5327585)
  ('Dr. Ali Kılıç', 'Göz Asistanı', d_goz, 4.0, 3, 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300', 'Genel göz muayenesi.'); -- M (Pexels ID: 5327656)

  -- 3. KARDİYOLOJİ (2 Erkek, 1 Kadın)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Prof. Dr. Burak Özdemir', 'Girişimsel Kardiyoloji', d_kardiyo, 5.0, 30, 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300', 'Anjiyo ve stent uzmanı.'), -- M (Pexels ID: 5452293)
  ('Doç. Dr. Emre Kurt', 'Kardiyoloji', d_kardiyo, 4.7, 15, 'https://images.pexels.com/photos/6129437/pexels-photo-6129437.jpeg?auto=compress&cs=tinysrgb&w=300', 'Kalp yetmezliği ve ritim.'), -- M (Pexels ID: 6129437)
  ('Dr. Merve Şahin', 'Kardiyoloji Uzmanı', d_kardiyo, 4.5, 9, 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300', 'Hipertansiyon takibi.'); -- F (Pexels ID: 4173239)

  -- 4. ORTOPEDİ (2 Kadın, 1 Erkek)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Op. Dr. Esra Çelik', 'Ortopedi Uzmanı', d_ortopedi, 4.8, 14, 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=300', 'Çocuk ortopedisi.'), -- F (Pexels ID: 4225880)
  ('Dr. Kübra Arslan', 'Fizik Tedavi', d_ortopedi, 4.4, 7, 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=300', 'Spor yaralanmaları.'), -- F (Pexels ID: 4225920)
  ('Prof. Dr. Onur Aslan', 'Ortopedi Cerrahı', d_ortopedi, 4.9, 22, 'https://images.pexels.com/photos/5327879/pexels-photo-5327879.jpeg?auto=compress&cs=tinysrgb&w=300', 'Eklem protez cerrahisi.'); -- M (Pexels ID: 5327879)

  -- 5. CİLDİYE (2 Erkek, 1 Kadın)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Uzm. Dr. Serkan Acar', 'Dermatoloji', d_cildiye, 4.6, 11, 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300', 'Sedef ve egzama.'), -- M (Pexels ID: 5452268)
  ('Dr. Yusuf Doğan', 'Estetik Dermatoloji', d_cildiye, 4.5, 8, 'https://images.pexels.com/photos/8961014/pexels-photo-8961014.jpeg?auto=compress&cs=tinysrgb&w=300', 'Lazer ve dolgu işlemleri.'), -- M (Pexels ID: 8961014)
  ('Dr. Fatma Koç', 'Deri Hastalıkları', d_cildiye, 4.7, 10, 'https://images.pexels.com/photos/5215017/pexels-photo-5215017.jpeg?auto=compress&cs=tinysrgb&w=300', 'Akne tedavileri.'); -- F (Pexels ID: 5215017)

  -- 6. NÖROLOJİ (2 Kadın, 1 Erkek)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Prof. Dr. Buse Aydın', 'Nöroloji', d_noroloji, 5.0, 26, 'https://images.pexels.com/photos/4173265/pexels-photo-4173265.jpeg?auto=compress&cs=tinysrgb&w=300', 'Alzheimer uzmanı.'), -- F (Pexels ID: 4173265)
  ('Dr. Sude Öztürk', 'Nöroloji Uzmanı', d_noroloji, 4.6, 12, 'https://images.pexels.com/photos/5214966/pexels-photo-5214966.jpeg?auto=compress&cs=tinysrgb&w=300', 'Migren tedavileri.'), -- F (Pexels ID: 5214966)
  ('Dr. Furkan Çetin', 'Nörolog', d_noroloji, 4.2, 5, 'https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=300', 'Epilepsi takibi.'); -- M (Pexels ID: 6325984)

  -- 7. ÇOCUK SAĞLIĞI (2 Erkek, 1 Kadın)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Uzm. Dr. Oğuzhan Eren', 'Pediatri', d_cocuk, 4.8, 16, 'https://images.pexels.com/photos/5452253/pexels-photo-5452253.jpeg?auto=compress&cs=tinysrgb&w=300', 'Çocuk enfeksiyonları.'), -- M (Pexels ID: 5452253)
  ('Dr. Berkay Uslu', 'Çocuk Doktoru', d_cocuk, 4.4, 7, 'https://images.pexels.com/photos/6129203/pexels-photo-6129203.jpeg?auto=compress&cs=tinysrgb&w=300', 'Gelişim takibi.'), -- M (Pexels ID: 6129203)
  ('Dr. Hande Yıldız', 'Yenidoğan Uzmanı', d_cocuk, 4.7, 13, 'https://images.pexels.com/photos/4173259/pexels-photo-4173259.jpeg?auto=compress&cs=tinysrgb&w=300', 'Bebek beslenmesi.'); -- F (Pexels ID: 4173259)

  -- 8. DİŞ HEKİMLİĞİ (2 Kadın, 1 Erkek)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Dt. Ceren Polat', 'Ortodontist', d_dis, 4.9, 15, 'https://images.pexels.com/photos/3845729/pexels-photo-3845729.jpeg?auto=compress&cs=tinysrgb&w=300', 'Diş teli tedavileri.'), -- F (Pexels ID: 3845729)
  ('Dt. Derya Korkmaz', 'Pedodontist', d_dis, 4.6, 9, 'https://images.pexels.com/photos/6532373/pexels-photo-6532373.jpeg?auto=compress&cs=tinysrgb&w=300', 'Çocuk diş hekimliği.'), -- F (Pexels ID: 6532373)
  ('Dt. Hakan Taş', 'Çene Cerrahı', d_dis, 4.8, 20, 'https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=300', 'İmplant tedavisi.'); -- M (Pexels ID: 3779705)

  -- 9. KBB (2 Erkek, 1 Kadın)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Op. Dr. Volkan Özer', 'KBB Uzmanı', d_kbb, 4.7, 14, 'https://images.pexels.com/photos/6303597/pexels-photo-6303597.jpeg?auto=compress&cs=tinysrgb&w=300', 'Burun estetiği.'), -- M (Pexels ID: 6303597)
  ('Dr. Mustafa Demirel', 'KBB', d_kbb, 4.3, 6, 'https://images.pexels.com/photos/6303698/pexels-photo-6303698.jpeg?auto=compress&cs=tinysrgb&w=300', 'İşitme sorunları.'), -- M (Pexels ID: 6303698)
  ('Dr. İrem Güneş', 'KBB Asistanı', d_kbb, 4.1, 3, 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=300', 'Genel KBB.'); -- F (Pexels ID: 3714743)

  -- 10. PSİKİYATRİ (2 Kadın, 1 Erkek)
  INSERT INTO doctors (name, specialty, department_id, rating, years_of_experience, image_url, about) VALUES
  ('Prof. Dr. Melis Karaca', 'Psikiyatrist', d_psiko, 5.0, 28, 'https://images.pexels.com/photos/4101140/pexels-photo-4101140.jpeg?auto=compress&cs=tinysrgb&w=300', 'Depresyon terapisi.'), -- F (Pexels ID: 4101140)
  ('Dr. Nisa Aksoy', 'Klinik Psikolog', d_psiko, 4.7, 10, 'https://images.pexels.com/photos/4098224/pexels-photo-4098224.jpeg?auto=compress&cs=tinysrgb&w=300', 'Aile danışmanlığı.'), -- F (Pexels ID: 4098224)
  ('Dr. Tolga Kaan', 'Psikiyatri Uzmanı', d_psiko, 4.5, 8, 'https://images.pexels.com/photos/4342400/pexels-photo-4342400.jpeg?auto=compress&cs=tinysrgb&w=300', 'Kaygı bozuklukları.'); -- M (Pexels ID: 4342400)

END $$;
