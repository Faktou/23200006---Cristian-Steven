import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const data = await prisma.organisasi.findMany({
            orderBy: { id: 'asc' },
        });
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Error fetching organisasi:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch organizations' }), { status: 500 });
    }
}

export async function POST(request) {
    const {
        nama_organisasi,
        ketua_organisasi,
        no_kontak,
        tahun_dibentuk,
        pembina
    } = await request.json();

    if (!nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), {
            status: 400,
        });
    }

    try {
        const organisasi = await prisma.organisasi.create({
            data: {
                nama_organisasi,
                ketua_organisasi,
                no_kontak,
                tahun_dibentuk: new Date(tahun_dibentuk),
                pembina,
            },
        });
        return new Response(JSON.stringify(organisasi), { status: 201 });
    } catch (error) {
        console.error("Error creating organisasi:", error);
        return new Response(JSON.stringify({ error: 'Failed to create organization' }), { status: 500 });
    }
}

export async function PUT(request) {
    const {
        id,
        nama_organisasi,
        ketua_organisasi,
        no_kontak,
        tahun_dibentuk,
        pembina
    } = await request.json();

    if (!id || !nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return new Response(JSON.stringify({ error: 'All fields (including ID) are required for update' }), {
            status: 400
        });
    }

    try {
        const organisasi = await prisma.organisasi.update({
            where: { id: Number(id) },
            data: {
                nama_organisasi,
                ketua_organisasi,
                no_kontak,
                tahun_dibentuk: new Date(tahun_dibentuk),
                pembina,
            },
        });
        return new Response(JSON.stringify(organisasi), { status: 200 });
    } catch (error) {
        console.error("Error updating organisasi:", error);
        return new Response(JSON.stringify({ error: 'Failed to update organization' }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = await request.json();

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required to delete' }), { status: 400 });
    }

    try {
        await prisma.organisasi.delete({ where: { id: Number(id) } });
        return new Response(JSON.stringify({ message: 'Deleted Successfully' }), { status: 200 });
    } catch (error) {
        console.error("Error deleting organisasi:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete organization' }), { status: 500 });
    }
}
