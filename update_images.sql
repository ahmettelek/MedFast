DO $$
DECLARE
d_dahiliye UUID; d_goz UUID; d_kardiyo UUID; d_ortopedi UUID; d_cildiye UUID;
d_noroloji UUID; d_cocuk UUID; d_dis UUID; d_kbb UUID; d_psiko UUID;
BEGIN
  -- 1. Departman ID'lerini al
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

  -- 2. DOKTOR RESİMLERİNİ GÜNCELLE (Unsplash - Gerçek ve Kaliteli Doktor Fotoğrafları)
  
  -- Dahiliye
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ahmet Yılmaz%' AND department_id = d_dahiliye;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Sevgi Demir%' AND department_id = d_dahiliye;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Caner Erkin%' AND department_id = d_dahiliye;

  -- Göz
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Mehmet Öz%' AND department_id = d_goz;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ayşe Kaya%' AND department_id = d_goz;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Burak Yıl%' AND department_id = d_goz;

  -- KBB
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Selin Vural%' AND department_id = d_kbb;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1612916628675-ed519fce002a?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Kerem Bursin%' AND department_id = d_kbb;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Elif Gül%' AND department_id = d_kbb;

  -- Kardiyoloji
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Mesut Kalp%' AND department_id = d_kardiyo;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Leyla Damar%' AND department_id = d_kardiyo;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1612531386530-97286d74c2ea?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Cem Atar%' AND department_id = d_kardiyo;

  -- Ortopedi
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Levent Kemik%' AND department_id = d_ortopedi;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1614608682850-e0da5088c34f?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Canan Diz%' AND department_id = d_ortopedi;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd6bf?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Mert Kırık%' AND department_id = d_ortopedi;

  -- Cildiye
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Elif Deri%' AND department_id = d_cildiye;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Selim Ben%' AND department_id = d_cildiye;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Pınar Leke%' AND department_id = d_cildiye;

  -- Nöroloji
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Nevzat Beyin%' AND department_id = d_noroloji;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Aysel Sinir%' AND department_id = d_noroloji;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1582200845353-bd186a51d45c?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Cemal Atak%' AND department_id = d_noroloji;

  -- Çocuk
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Neşe Çocuk%' AND department_id = d_cocuk;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1605684954998-685c7926a05d?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ali Bebek%' AND department_id = d_cocuk;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Zeynep Minik%' AND department_id = d_cocuk;

  -- Diş
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Kemal Diş%' AND department_id = d_dis;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1588776813158-cef7047ca7d1?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ayça İnci%' AND department_id = d_dis;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1550831106-0994fe8abcfe?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ozan Mine%' AND department_id = d_dis;

  -- Psikiyatri
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Ruhsar Denge%' AND department_id = d_psiko;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Barış Zihin%' AND department_id = d_psiko;
  UPDATE doctors SET image_url = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&h=300' WHERE name LIKE '%Melis Duygu%' AND department_id = d_psiko;

END $$;
