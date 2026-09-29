const { Resend } = require("resend");

const resend = new Resend('send.forge.rmta.net');

// ========================================
// CORE FUNCTION
// جميع الإيميلات تمر من هنا
// ========================================

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "منصة زفاف <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });

    console.log(
      "📧 Email sent successfully:",
      data.id
    );

    return data;
  } catch (error) {
    console.error(
      "❌ Resend Error:",
      error.message
    );

    throw error;
  }
};

// ========================================
// Provider approved email
// ========================================

const sendProviderApprovalEmail = async ({
  email,
  providerName,
}) => {
  const name =
    providerName?.trim() || "مقدم الخدمة";

  const html = `
<!DOCTYPE html>

<html
  lang="ar"
  dir="rtl"
>

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>تم اعتماد حسابك</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f8eee7;
    font-family:Arial,Tahoma,sans-serif;
  "
>

  <div
    style="
      max-width:620px;
      margin:40px auto;
      padding:20px;
    "
  >

    <div
      style="
        background:#fffaf5;
        border:1px solid #eadbd2;
        border-radius:24px;
        overflow:hidden;
      "
    >

      <!-- Header -->

      <div
        style="
          background:#6B3038;
          padding:35px 25px;
          text-align:center;
        "
      >

        <div
          style="
            color:#e5c28d;
            font-size:32px;
            font-weight:bold;
          "
        >
          زَفَاف
        </div>

        <div
          style="
            margin-top:8px;
            color:#ffffff;
            font-size:14px;
          "
        >
          منصة تجمع تفاصيل يومك الجميل
        </div>

      </div>


      <!-- Content -->

      <div
        style="
          padding:40px 30px;
        "
      >

        <h1
          style="
            margin:0 0 20px;
            color:#2d2424;
            font-size:25px;
          "
        >
          تم اعتماد حسابك
        </h1>


        <p
          style="
            color:#4f4140;
            font-size:16px;
            line-height:2;
          "
        >
          مرحبًا
          <strong>${name}</strong>،
        </p>


        <p
          style="
            color:#5f504d;
            font-size:15px;
            line-height:2;
          "
        >
          يسعدنا إبلاغك بأنه تم اعتماد حسابك
          كمقدم خدمة في منصة زَفَاف.
        </p>


        <div
          style="
            margin:25px 0;
            padding:20px;
            background:#f8eee7;
            border-radius:16px;
          "
        >

          <p
            style="
              margin:0;
              color:#6B3038;
              font-size:15px;
              line-height:2;
              font-weight:bold;
            "
          >
            أصبح بإمكانك الآن تسجيل الدخول
            إلى حسابك وإدارة نشاطك وإضافة
            خدماتك وباقاتك ومحتواك.
          </p>

        </div>


        <div
          style="
            text-align:center;
            margin:30px 0;
          "
        >

          <a
            href="http://localhost:5173/auth/login"
            style="
              display:inline-block;
              background:#6B3038;
              color:#ffffff;
              text-decoration:none;
              padding:14px 32px;
              border-radius:12px;
              font-size:15px;
              font-weight:bold;
            "
          >
            تسجيل الدخول
          </a>

        </div>


        <p
          style="
            margin-top:30px;
            color:#7b6a65;
            font-size:14px;
            line-height:2;
          "
        >
          نتمنى لك تجربة موفقة ونجاحًا مستمرًا
          مع منصة زَفَاف.
        </p>


        <p
          style="
            color:#6B3038;
            font-weight:bold;
          "
        >
          فريق زَفَاف
        </p>

      </div>

    </div>

  </div>

</body>

</html>
`;



  return sendEmail({
    to: email,
    subject: "تم اعتماد حسابك في منصة زَفَاف",
    html,
  });
};

module.exports = {
  sendEmail,
  sendProviderApprovalEmail,
};